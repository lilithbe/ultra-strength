import { model } from "../../db"
import { multipleUpload, singleUpload } from "../../lib/file"
import AdmZip from 'adm-zip'
import { v4 } from 'uuid'
import fs from 'fs'
import sharp from "sharp";
import { SlowBuffer } from "buffer"


const admZipHandler = async (file) => {
  try {
    console.log('rotate start')
    const rotateZip = file['rotateZip']
    const key = v4()
    const rotateName = rotateZip.name.replace('.zip', '')
    const moveFolder = `./rotate/${key}_${rotateZip.name}`;
    const unZipFolder = `./client/build/rotate/${key}_${rotateName}`;

    await rotateZip.mv(moveFolder)
    if (fs.existsSync(unZipFolder)) {
      await fs.mkdirSync(unZipFolder)
    }

    const zip = await new AdmZip(moveFolder);

    await zip.extractAllTo(`${unZipFolder}/`, /* 압축결과가 기존 파일을 overwrite 할지 */ false)
    console.log('rotate end')
    return {
      rotateKey: key,
      rotateName: rotateName
    }
  } catch (error) {
    return { error: error }
  }






}



export const CreateCategory = async (req, res) => {
  try {
    await model('product_category').create(req.body).then((data) => {
      console.log(data)
      res.status(200).json({ reqName: 'Create Category', status: true, data })
    })
  } catch (error) {
    res.status(200).json({ reqName: 'Create Category', status: false })
  }

}

export const DeleteCategory = async (req, res) => {
  try {
    await model('product_category').deleteOne(req.body)
    res.status(200).json({ reqName: 'Delete Category', status: true })
  } catch (error) {
    res.status(200).json({ reqName: 'Delete Category', status: false })
  }
}

export const ListCategory = (req, res) => {
  try {
    model('product_category').find().then((data) => {
      res.status(200).json({ reqName: 'List Category', status: true, data })
    })
  } catch (error) {
    res.status(200).json({ reqName: 'List Category', status: false })
  }
}

export const getProduct = (req, res) => {
  try {
    model('product').findById({ _id: req.body.id }).then((data) => {
      res.status(200).json({ reqName: 'get Product', status: true, data })
    })
  } catch (error) {
    res.status(200).json({ reqName: 'get Product', status: false })
  }
}



export const ListProduct = (req, res) => {
  try {
    model('product').find().then((data) => {
      res.status(200).json({ reqName: 'List product', status: true, data })
    })
  } catch (error) {
    res.status(200).json({ reqName: 'List product', status: false })
  }
}
export const ListProductToCategory = (req, res) => {
  try {
    model('product').find({ categoryId: req.body.categoryId }).then((data) => {
      res.status(200).json({ reqName: 'List product', status: true, data })
    })
  } catch (error) {
    res.status(200).json({ reqName: 'List product', status: false })
  }
}

const ProductEditor = async (req, res, saveType) => {
  try {
    
    if (req.isLogin) {
     if (req.body.categoryId === '') {
        res.status(200).json({ reqName: 'Create Product', status: false, message: '카테고리 선택은 필수 사항입니다.', activeIndex: 0 })
      } else {
        if (saveType === 'create') {
          await model('product').create(req.body).then(async(data) => {
            for (let i = 0; i < req.body.images.length; i++) {
              const image = req.body.images[i];
              await image.currnetUseProducts.push(data._id.toString())
              await model('product_image').findByIdAndUpdate(image._id,image)
            }
            if(req.body.isRotate===true){
              const getRotate= await model('rotate').findById(req.body.rotateId)
              await getRotate.currnetUseProducts.push(data._id.toString())
              await model('rotate').findByIdAndUpdate(getRotate._id,getRotate)
            }
         
            res.status(200).json({ reqName: 'Create Product', status: true, message: '제품등록이 정상적으로 업로드 되었습니다.', data: data })
          })
        } else {
            
          const getOldProduct = await model('product').findById(req.body._id)   
            /**
             * 로테이트에 해당 제품의 사용내역 삭제
             */
        
          if (getOldProduct.isRotate) {
            const getRotate = await model('rotate').findById(getOldProduct.rotateId)
            const ORResult = Array.from(getRotate.currnetUseProducts)
            const ORIndex = ORResult.findIndex(f => f === req.body._id)
            if (ORIndex !== -1) {
              ORResult.splice(ORIndex, 1)
            }
            await model('rotate').findByIdAndUpdate(getOldProduct.rotateId, { currnetUseProducts: ORResult })
          }
          /**
           * 이미지 목록에서 사용중인 이미지의 사용 내역 삭제
           */
          if (getOldProduct.images.length > 0) {
            for (let i = 0; i < getOldProduct.images.length; i++) {
              const oldImage = getOldProduct.images[i];
              const getOldImage = await model('product_image').findById(oldImage._id)
              const OIResult = Array.from(getOldImage.currnetUseProducts)
              const OIIndex = OIResult.findIndex(f => f === req.body._id)
              if (OIIndex !== -1) {
                OIResult.splice(OIIndex, 1)
              }
              await model('product_image').findByIdAndUpdate(oldImage._id, { currnetUseProducts: OIResult })
            }
          }

        
        
          for (let i = 0; i < req.body.images.length; i++) {
            const image = req.body.images[i];
            await image.currnetUseProducts.push(req.body._id.toString())
            await model('product_image').findByIdAndUpdate(image._id,image)
          }
          if(req.body.isRotate===true){
            const getRotate= await model('rotate').findById(req.body.rotateId)
            await getRotate.currnetUseProducts.push(req.body._id.toString())
            await model('rotate').findByIdAndUpdate(getRotate._id,getRotate)
          }
          
          await model('product').findByIdAndUpdate(req.body._id,req.body)

         res.status(200).json({ reqName: 'Update Product', status: true, message: '제품등록이 정상적으로 수정 되었습니다.',data:req.body})
        }
      }
    } else {
      res.status(200).json({ reqName: 'Create Product', status: false, message: '로그인상태가 해제되었습니다.', activeIndex: 2 })
    }
  } catch (error) {
    console.log(error)
    res.status(200).json({ reqName: 'Create Product', status: false, message: '최소 한개 이상의 이미지를 업로드 해주세요.(catch)', activeIndex: 2 })
  }
}
export const CreateProduct = async (req, res) => {
  try {
    await ProductEditor(req, res, 'create')
  } catch (error) {
    res.status(200).json({ reqName: 'Create Product', status: false, message: '최소 한개 이상의 이미지를 업로드 해주세요.(catch)', activeIndex: 2 })
  }
}

export const DeleteProduct = async (req,res) =>{
  try { 
    for (let i = 0; i < req.body.images.length; i++) {
      const image = req.body.images[i];
      // fs.unlink(`./client/build${image.src}`)
      const getImage = await model('product_image').findById(image._id.toString())
 
      //currnetUseProducts
      const CUP_result = Array.from(getImage.currnetUseProducts)
     
      const productIndex = getImage.currnetUseProducts.findIndex((f)=>f===req.body._id)
      console.log(productIndex , getImage.currnetUseProducts ,req.body._id)
      if(productIndex !== -1){
        CUP_result.splice(productIndex , i)
      }
      await model('product_image').findByIdAndUpdate(image._id.toString(),{currnetUseProducts:CUP_result})
    }
    await model('product').findByIdAndDelete(req.body._id)

    res.status(200).json({ reqName: 'Product Delete test', status: true, })
  } catch (error) {
     console.log(error)
    res.status(200).json({ reqName: 'Product Delete', status: false, })
  }
}
export const DeleteImage = async(req,res)=>{
  try {
    /**
     * 이미지 정보 가져오기
     * 가져온 이미지를 제품 이미지로 사용중인 제품 목록 만들기
     * 만들어진 목록 루프
     * 제품에서 현재 이미지와 같은 이미지 제거하기 
     * 제거하고 이미지 카운팅
     * 카운팅보다 메인이미지인덱스값을+1 한 값이 더 클때에는 메인이미지 인덱스값을 -1로 줄이기. 이때 조건이 0보다 클경우 적용.
     */
     console.log(typeof(req.body._id.toString()), req.body._id)
     
    const getImage = await model('product_image').findById(req.body._id)

    if(getImage.currnetUseProducts.length>0){
      for (let i = 0; i < getImage.currnetUseProducts.length; i++) {
        const productId = getImage.currnetUseProducts[i];
        const getProduct = await model('product').findById(productId)
        if(getProduct){
          const images=Array.from(getProduct.images)
          const imageIndex = images.findIndex(f=>f._id===req.body._id.toString())
          images.splice(imageIndex,1)
          let mainImageIndex = getProduct.mainImageIndex
          if(images.length < mainImageIndex+1 && mainImageIndex !== 0){
            mainImageIndex = mainImageIndex-1
          }
          await model('product').findByIdAndUpdate(productId,{images:images,mainImageIndex:mainImageIndex})   
        }
      }
    }
    await fs.unlink(`./client/build${req.body.src}`,async(err)=>{
      if(err) console.log(err)
     await model('product_image').findByIdAndDelete(req.body._id.toString())
    })
    const productData = await model('product').find()
    res.status(200).json({ reqName: 'Image  Delete', status: true,productData:productData })
  } catch (error) {
    console.log(error)
    res.status(200).json({ reqName: 'Image  Delete', status: false, })
  }
}
export const UpdateAllProduct = async (req, res) => {
  try {
    await ProductEditor(req, res, 'update')
  } catch (error) {
    res.status(200).json({ reqName: 'Create Product', status: false, message: '최소 한개 이상의 이미지를 업로드 해주세요.(catch)', activeIndex: 2 })
  }
}

export const UpdateProduct = async (req, res) => {
  await model('product').findByIdAndUpdate(req.body._id, req.body)

  res.status(200).json({ reqName: 'Update Product', status: true })
}

/**
 * 프로덕트 에디터 이미지 업로드 핸들러
 * @param {*} req 
 * @param {*} res 
 */
export const ProductInfoImageUploadHandler = async (req, res) => {
  const updloadData = await singleUpload(req, 'file-0')

  res.status(200).json({ reqName: 'Product Info Image Upload', status: true, result: [updloadData] })
}

export const MyCartList = async (req, res) => {


  const mycart = async (arr) => {
    const result = []
    for (let i = 0; i < arr.length; i++) {
      const id = arr[i];
      result.push(await model('product').findById(id))
    }
    return result
  }

  await mycart(req.body.cartList).then((result) => {
    res.status(200).json({ reqName: 'Product My Cart List', status: true, data: result })
  })


}


export const RotateCreate = async (req, res) => {
  try {
    const rotateZip = req.files.rotate
    const key = v4()
    const moveFolder = `./rotate/${key}_${rotateZip.name}`; 
    const makeFolderName = `${key}_${rotateZip.name.replace('.zip', '')}`
    const unZipFolder = `./client/build/rotate/${makeFolderName}`;
    await rotateZip.mv(moveFolder)
    if (fs.existsSync(`${unZipFolder}`)) {
      await fs.mkdirSync(`${unZipFolder}`)
    }     
    const zip = await new AdmZip(moveFolder);
    await zip.extractAllTo(`${unZipFolder}/`, /* 압축결과가 기존 파일을 overwrite 할지 */ false)
    await fs.readdir(unZipFolder, async (err, mainFiles) => {
      for (let i = 0; i < mainFiles.length; i++) {
        const folder = mainFiles[i];
        if (folder.split('.')[1] !== 'html') {  
          for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 15; j++) {
              if(i===0){
                await fs.rename(`${unZipFolder}/${folder}/${folder}/${i}_${j}.png`,`${unZipFolder}/${j}.png`,(err,)=>{
                  if( err ) throw err;
                })
              }else{
              await  fs.unlink(`${unZipFolder}/${folder}/${folder}/${i}_${j}.png`, function(err){
                  if( err ) throw err;
              });
              }
          
            }
          }
          //내용 저장
        }
      }
  
    })
    const rotate= await model('rotate').create({value:makeFolderName,key:key,label:rotateZip.name.replace('.zip', '')})
  
    res.status(200).json({ reqName: 'Product Rotate Create',status:true, data:rotate})
  } catch (error) {
    res.status(200).json({ reqName: 'Product Rotate Create',status:false, error:error})
  }

}


export const RotateDelete = async (req,res)=>{
  //로테이트 삭제
  //모델 삭제,
  //파일 삭제,
  //사용중인 제품 추적 및 내용 변경
  //변경 내용 isRotate :false
  //          rotate:null
  try {
    const {_id, currnetUseProducts, value}=req.body
    const targetFolder = `./client/build/rotate/${value}`;
    for (let i = 0; i < currnetUseProducts.length; i++) {
      const changeId = currnetUseProducts[i];
      
    }
    res.status(200).json({ reqName: 'Product Rotate Create',status:true})
  } catch (error) {
    res.status(200).json({ reqName: 'Product Rotate Delete',status:false, error:error})
  }
}


const fileSaveHandler = async(file, moveFolder)=>{
  const result={
    label:file.name,
    src:`${moveFolder}/${file.name}`,
    size:file.size,
    currnetUseProducts:[],
  }
  await file.mv(`./client/build${moveFolder}/${file.name}`);
  const image = await sharp(`./client/build${moveFolder}/${file.name}`);
  await image.metadata().then(async (metadata) => {
    result.width = metadata.width
    result.height = metadata.height
  })
  return result
}

export const ImageUpload = async(req,res)=>{
  try {
    const key=v4()
    const moveFolder = `/images/product/${key}`;
    const result = []

    
     if (fs.existsSync(moveFolder)) {
      await fs.mkdirSync(moveFolder,  { recursive: true })
    }


    if(req.files.productImage.length===undefined){
      console.log('single')
     const fileResult =  await fileSaveHandler(req.files.productImage,moveFolder)
     await result.push(fileResult)

    }else{
      console.log('multipie')
      for (let i = 0; i < req.files.productImage.length; i++) {
        const file = req.files.productImage[i];
     
        const fileResult = await fileSaveHandler(file, moveFolder)
        await result.push(fileResult)
      }
    }
    const images= await model('product_image').create(result)
    console.log(images)
    res.status(200).json({ reqName: 'Product image Create',status:true,result:images})



  } catch (error) {
    console.log('error', error)
    res.status(200).json({ reqName: 'Product image Create',status:false , error:error})
  }
     
}