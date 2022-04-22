import React ,{ useState } from 'react'
import { SelectButton } from 'primereact/selectbutton'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import { ColumnGroup } from 'primereact/columngroup';
import { Row } from 'primereact/row';
import { Dropdown } from 'primereact/dropdown'
import { InputNumber } from 'primereact/inputnumber'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'


import ColorSelecter from './ColorSelecter'
import { Card } from 'primereact/card';




const OptionTable = ({ product, setProduct }) => {
    const boolOptions = [
        { label: '사용', value: true },
        { label: '미사용', value: false },
    ]
    const optionInfomationInit = { label: '', value: '', colors: [], optionType: 'string', sizes: [], count: 0, price: 0 }
    const addOptionInfomation = (count) => {

        const result = []
        for (let i = 0; i < count; i++) {
            result.push(optionInfomationInit)
        }
        return result
    }
    const deleteHandler = (count) => {
        const result = Array.from(product.selectOptionInfomation)
        result.splice(count)
        return result
    }

    const [isOptionCreate, setIsOptionCreate] = useState(false)
    const optionListCreate = (e) => {
     
        
        //product.selectOptionInfomation
        //product.selectOptionType
        const result = []
        const options = []
        const optionInit = { count: 0, price: 0, isUsed: true, code: '' }
      
        if (product.selectOptionType === 'multiple') {

            for (let i = 0; i < product.selectOptionInfomation.length; i++) {
                const element = product.selectOptionInfomation[i];
                options.push(element.optionType === 'color' ? element.colors : element.value.split(','))
            }

            for (var el1 in options[0]) {
                if (options.length === 1) {
                    if (options[0][el1] !== '') {
                        result.push({ id: `production-options-${el1}`, value_1: options[0][el1], ...optionInit });
                    }

                } else if (options.length === 2) {
                    for (var el2 in options[1]) {
                        if (options[0][el1] !== '' && options[1][el2] !== '') {
                            result.push({ id: `production-options-${el1}${el2}`, value_1: options[0][el1], value_2: options[1][el2], ...optionInit });
                        }
                    }

                } else if (options.length === 3) {
                    for (var el2 in options[1]) {
                        for (var el3 in options[2]) {
                            if (options[0][el1] !== '' && options[1][el2] !== '' && options[2][el3] !== '') {
                                result.push({ id: `production-options-${el1}${el2}${el3}`, value_1: options[0][el1], value_2: options[1][el2], value_3: options[2][el3], ...optionInit });
                            }
                        }
                    }
                }

            }

            setProduct({ ...product, selectMultipleOptionList: result })
            setIsOptionCreate(true)
        } else {
            for (let i = 0; i < product.selectOptionInfomation.length; i++) {
                const element = product.selectOptionInfomation[i];
                const options = element.optionType === 'color' ? element.colors : element.value.split(',')
                for (let ii = 0; ii < options.length; ii++) {
                    const option = options[ii];
                    result.push({
                        label: element.label,
                        value: option, isUsed: true,
                    })
                }
            }
        
            setProduct({ ...product, selectSingleOptionList: result })
            setIsOptionCreate(true)
        }


     
    }


    return (
        <div>
            <div>
                <div className='row'>
                    <label className='col-2'>선택형</label>
                    <div className='col-10'>
                        <SelectButton value={product.isSelectOption} options={boolOptions} onChange={(e) => {
                            e.preventDefault()
                            setProduct({ ...product, isSelectOption: e.value, count: 0 }) }} />
                    </div>
                </div>
                {product.isSelectOption ?
                    <div>
                        <div className='row'>
                            <label className='col-2'>옵션 구성타입</label>
                            <div className='col-10'>
                                <SelectButton value={product.selectOptionType} options={[{ label: '단독형', value: 'single' }, { label: '조합형', value: 'multiple' }]} 
                                onChange={(e) => {
                                    e.preventDefault()
                                    if (e.value !== null) {
                                        setProduct({ ...product, selectOptionType: e.value })
                                    }
                                    setIsOptionCreate(false)

                                }} />
                            </div>
                        </div>

                        <div className='row'>
                            <label className='col-2'>옵션명 개수</label>
                            <div className='col-10'>
                                <Dropdown value={product.selectOptionCount} options={[{ label: '1개', value: 1 }, { label: '2개', value: 2 }, { label: '3개', value: 3 }]} onChange={(e) => {
                                    setProduct({
                                        ...product,
                                        selectOptionCount: e.value,
                                        selectOptionInfomation:
                                            product.selectOptionInfomation.length > e.value ?
                                                deleteHandler(e.value) :
                                                product.selectOptionInfomation.length < e.value ?
                                                    [...product.selectOptionInfomation, ...addOptionInfomation(e.value - product.selectOptionInfomation.length)] :
                                                    product.selectOptionInfomation
                                    })
                                    setIsOptionCreate(false)
                                }} />
                            </div>
                        </div>
                        {/* Option List */}
                        <div className='row'>
                            <label className='col-2'>옵션입력</label>
                            <div className='col-10'>
                                {product.selectOptionInfomation.map((item, i) => {
                                    return (
                                        <SelectOptionInfomation key={i}
                                            item={item} index={i}
                                            onChange={(value) => {
                                                const result = Array.from(product.selectOptionInfomation)
                                                result.splice(i, 1, value)
                                                setProduct({
                                                    ...product,
                                                    selectOptionInfomation: result
                                                })
                                            }}
                                            deleteCallback={(e) => {
                                                e.preventDefault()
                                                const result = Array.from(product.selectOptionInfomation)
                                                result.splice(i, 1)
                                                setProduct({
                                                    ...product,
                                                    selectOptionCount: result.length,
                                                    selectOptionInfomation: result
                                                })
                                            }}

                                        />
                                    )
                                })}
                                <Button icon="bi bi-arrow-down" label="옵션목록으로 적용" onClick={async(e)=>{
                                    e.preventDefault()
                                   await setIsOptionCreate(false)
                                   await optionListCreate(e)}} />
                            </div>
                        </div>

                        {/* Option Table */}
                        <div>

                            {isOptionCreate && product.selectOptionType === 'multiple' ?
                                <MultipleDataTable value={product.selectMultipleOptionList} optionInfo={product.selectOptionInfomation}
                                    onChange={(value) => {
                                        let count = 0
                                        for (let i = 0; i < value.length; i++) {
                                            const item = value[i];
                                            count = count + item.count
                                        }
                                        setProduct({
                                            ...product,
                                            count: count,
                                            selectMultipleOptionList: value,
                                        })
                                    }}
                                /> :isOptionCreate &&product.selectOptionType === 'single' ?
                                <SingleDataTable value={product.selectSingleOptionList} 
                                onChange={(value) => {
                                 setProduct({
                                     ...product,
                                     selectSingleOptionList: value,
                                 })
                             }}
                             /> : null}
                        </div>





                    </div>
                    : null}

            </div>


            <div>
                <div className='row'>
                    <label className='col-2'>입력형</label>
                    <div className='col-10'>
                        <SelectButton value={product.isInputOption} options={boolOptions} onChange={(e) => {
                            e.preventDefault()
                            if (e.value !== null) {
                                setProduct({ ...product, isInputOption: e.value })
                            }
                        }} />
                    </div>
                </div>
                {product.isInputOption ?
                    <div>
                        <InputOption count={product.inputOptionCount} value={product.inputOptions} product={product} onChange={(value) => {
                            setProduct(value)

                        }} />
                    </div>
                    : null}
            </div>







        </div>
    )
}

export default OptionTable
const SelectOptionInfomation = ({ item, onChange, deleteCallback, index }) => {
    return (
        <div className='row'>

            <div className='col-3'>
                <div className='btn-group w-100'>
                    <Button icon="bi bi-trash" style={{ minWidth: "50px" }} onClick={deleteCallback} disabled={index === 0} />
                    <Dropdown value={item.optionType} className=" w-100" options={[{ label: '컬러', value: 'color' }, { label: '직접입력', value: 'string' }]}
                        onChange={(e) => {
                            onChange({ ...item, optionType: e.value })


                        }}
                    />
                </div>

            </div>
            <div className='col-3'>
                <InputText value={item.label} className="w-100" placeholder="예시: 사이즈" onChange={(e) => {
                    onChange({ ...item, label: e.target.value })
                }} />
            </div>
            <div className='col-5'>
                {item.optionType === 'color' ? <ColorOptionSelecter colors={item.colors}
                    onChange={(colors) => {
                        onChange({ ...item, colors: colors })
                    }}
                /> :
                    <InputText value={item.value} className="w-100" placeholder="예시: xxl,xl,l,m,s ( , 로 구분)" onChange={(e) => {
                        onChange({ ...item, value: e.target.value.replaceAll(' ', '').replaceAll('#', '') })
                    }} />}
            </div>



        </div>
    )
}
const ColorOptionSelecter = ({ colors, onChange }) => {

    return (
        <div >
            <div className='btn-group p-0'>
                <Button icon="bi bi-plus" className='p-button-sm' onClick={(e) => { e.preventDefault(); onChange([...colors, '#ffffff']) }} />
                {colors.map((color, i) => {
                    return (
                        <ColorSelecter key={i} color={color}
                        isDeleteButton={true}
                        deleteCallback={() => {
                            const result = Array.from(colors)
                            result.splice(i, 1)
                            onChange(result)
                        }}
                        callback={(color) => {
                            const result = Array.from(colors)
                            result.splice(i, 1, color)
                            onChange(result)
                        }} />
                    )
                })}

            </div>
        </div>
    )
}

const MultipleDataTable = ({ value, optionInfo, onChange }) => {

    const [selected, setSelected] = useState([])
    const [valueState, setValueState] = useState(value)
    let headerGroup = <ColumnGroup >
        <Row>
            <Column selectionMode="multiple" rowSpan={2} />
            <Column header="옵션명" colSpan={optionInfo.length} />
            <Column header="옵션가" rowSpan={2} />
            <Column header="재고수량" rowSpan={2} />

            <Column header="판매상태" rowSpan={2} />
            <Column header="사용여부" rowSpan={2} />
            <Column header="삭제" rowSpan={2} />
        </Row>
        <Row>
            {optionInfo.map((item, i) => {
                return <Column key={i} header={item.label} />
            })}

        </Row>

    </ColumnGroup>;



    const countEditor = (options) => {
        return <InputNumber value={options.value} onChange={(e) => options.editorCallback(e.value)} className="w-100" />;
    }
    const textEditor = (options) => {
        return <InputText value={options.value} onChange={(e) => options.editorCallback(e.target.value)} className="w-100" />;
    }
    const boolDropdownEditor = (options) => {
        return <Dropdown options={[{ label: 'Y', value: true }, { label: 'N', value: false }]} value={options.value} onChange={(e) => options.editorCallback(e.value)} className="w-100" />;
    }
    const onCellEditComplete = (e) => {
        let { rowIndex, newRowData } = e;
        const result = Array.from(value)
        result.splice(rowIndex, 1, newRowData)
        onChange(result)
        setValueState(result)
    }
    const optionInit = { count: 0, price: 0, isUsed: true }
    const [checkItemAllState, setCheckItemAllState] = useState(optionInit)
    const [tableHeight, setTableHeight] = useState("400px")
    return (
        <Card subTitle={`${value.length} 개의 옵션`}>
        <div className='card-header p-0'>
            <div className='d-flex justify-content-between'>
                <div><Button icon="bi bi-trash" className='p-button-raised p-button-warning p-button-text p-button-sm w-100' label="선택삭제"
                    onClick={(e) => {
                        e.preventDefault()
                        const result = []
                        value.forEach((option) => {
                            const optionIndex = selected.findIndex(f => f.id === option.id)
                            if (optionIndex === -1) {
                                result.push(option)
                            }
                        })
                        setSelected([])
                        onChange(result)
                        setValueState(result)
                    }}

                /></div>
                <div className='d-flex justify-content-end' style={{ width: "900px" }}>
                    <div className='pl-3'>
                        <label className='pr-3'>옵션가</label>
                        <span >
                            <InputNumber value={checkItemAllState.price} className='p-inputtext-sm'
                                onChange={(e) => { setCheckItemAllState({ ...checkItemAllState, price: e.value }) }} />
                        </span>
                    </div>
                    <div className='pl-3'>
                        <label className='pr-3'>재고수량</label>
                        <span >
                            <InputNumber value={checkItemAllState.count} className='p-inputtext-sm'
                                onChange={(e) => { setCheckItemAllState({ ...checkItemAllState, count: e.value }) }} />
                        </span>
                    </div>
                    <div className='pl-3'>
                        <label className='pr-3' >사용여부</label>
                        <span >
                            <Dropdown className='p-inputtext-sm' value={checkItemAllState.isUsed} options={[{ label: 'Y', value: true }, { label: 'N', value: false }]}
                                onChange={(e) => { setCheckItemAllState({ ...checkItemAllState, isUsed: e.value }) }} />
                        </span>
                    </div>
                    <div className='pl-3'>
                        <Button label="선택목록 일괄수정" className='p-button-raised p-button-info p-button-text p-button-sm w-100'
                            onClick={(e) => {
                                e.preventDefault()
                                const result = []
                                value.forEach((option) => {
                                    const optionIndex = selected.findIndex(f => f.id === option.id)
                                    if (optionIndex === -1) {
                                        result.push(option)
                                    } else {
                                        result.push({ ...option, ...checkItemAllState })
                                    }
                                })
                                setSelected([])
                                onChange(result)
                                setValueState(result)
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>

        <div className='card-body'>
            <DataTable className='header-center body-center ' value={valueState} size="small" headerColumnGroup={headerGroup}
                editMode="cell" showGridlines 

                selectionMode="checkbox" selection={selected} onSelectionChange={e => setSelected(e.value)} dataKey="id" scrollable scrollHeight={tableHeight} >


                <Column selectionMode="multiple" />

                {optionInfo.map((_, i) => {
                    return (
                        <Column key={i} field={`value_${i + 1}`}
                            body={(row) => {

                                return row[`value_${i + 1}`].search('#') === -1 ? row[`value_${i + 1}`] : <div style={{ width: '30px', height: '30px', backgroundColor: row[`value_${i + 1}`] }} />
                            }}
                        />
                    )
                })}

                <Column  field="price" editor={(editor) => countEditor(editor)} onCellEditComplete={onCellEditComplete} />
                <Column  field='count' editor={(editor) => countEditor(editor)} onCellEditComplete={onCellEditComplete} />
                {/* 판매상태 */}
                <Column body={(row, col) => {
                    return row.count > 0 ? '판매중' : '품절'
                }} />
                {/* 관리코드 */}
                {/* <Column bodyClassName="p-0" field='code' editor={(editor) => textEditor(editor)} onCellEditComplete={onCellEditComplete} /> */}
                {/* 사용여부 */}
                <Column field='isUsed' body={(row, col) => {
                    return row.isUsed===true ? 'Y' : 'N'
                }} editor={(editor) => boolDropdownEditor(editor)} onCellEditComplete={onCellEditComplete} />
                {/* 삭제 */}
                <Column  body={(row, col) => {
                    return <Button icon="bi bi-trash" className='p-button-sm p-button-raised p-button-warning  p-button-text'
                    onClick={()=>{
                        const result = Array.from(value)
                        result.splice(col.rowIndex, 1)
                        onChange(result)
                        setValueState(result)
                    }} />
                }} />
            </DataTable>
        </div>

        <div className='card-footer'>
            <Dropdown options={[{ label: '짧은 테이블', value: '400px' }, { label: '확장 테이블', value: '600px' }]} value={tableHeight} onChange={(e) => setTableHeight(e.value)} />
        </div>
    </Card>
    )
}

const InputOption = ({ count, value, onChange, product }) => {
    const inputOptionInit = { label: '', isUser: true }
    const addOptionList = (count) => {
        const result = []
        for (let i = 0; i < count; i++) {
            result.push(inputOptionInit)
        }
        return result
    }

    const deleteHandler = (count) => {
        const result = Array.from(value)
        result.splice(count)
        return result
    }
    return (
        <div>
            <div className='row'>
                <div className='col-2'>
                    옵션명 개수
                </div>
                <div className='col-4'>

                    <Dropdown
                        value={count}
                        options={[{ label: '1개', value: 1 }, { label: '2개', value: 2 }, { label: '3개', value: 3 }, { label: '4개', value: 4 }, { label: '5개', value: 5 }]}
                        onChange={(e) => {
                            onChange({
                                ...product,
                                inputOptionCount: e.value,
                                inputOptions:
                                    product.inputOptions.length > e.value ?
                                        deleteHandler(e.value) :
                                        product.inputOptions.length < e.value ?
                                            [...product.inputOptions, ...addOptionList(e.value - product.inputOptions.length)] :
                                            product.inputOptions
                            })
                        }} />
                </div>
            </div>
            <div className="row">
                <div className='col-2'>
                    옵션목록(총 {value.length}개)
                </div>
                <div className='col-5'>
                    {value.map((item, i) => {
                        return (
                            <div className='p-inputgroup' key={i}>
                                <InputText width={500} value={item.label} placeholder="예시: 사이즈" onChange={(e) => {
                                    const result = Array.from(value)
                                    result.splice(i, 1, { ...item, label: e.target.value })
                                    onChange({
                                        ...product,
                                        inputOptions: result
                                    })
                                }} />
                                <Dropdown width="100px" options={[{ label: 'Y', value: true }, { label: 'N', value: false }]} onChange={(e) => {
                                    const result = Array.from(value)
                                    result.splice(i, 1, { ...item, isUsed: e.value })
                                    onChange({
                                        ...product,
                                        inputOptions: result
                                    })
                                }} />
                                <Button icon="bi bi-trash"
                                    className='p-button-warning'
                                    disabled={i === 0}
                                    onClick={() => {
                                        const result = Array.from(value)
                                        result.splice(i, 1)
                                        onChange({
                                            ...product,
                                            inputOptions: result
                                        })
                                    }} />
                                <Button icon="bi bi-plus"
                                    disabled={i === 4}
                                    onClick={() => {
                                        const result = Array.from(value)
                                        result.splice(i + 1, 0, inputOptionInit)
                                        onChange({
                                            ...product,
                                            inputOptionCount: product.inputOptionCount + 1,
                                            inputOptions: result
                                        })
                                    }}
                                />

                            </div>
                        )
                    })}

                </div>
            </div>


        </div>
    )
}

const SingleDataTable = ({value, onChange}) => { 
    const [selected, setSelected] = useState([])

    const boolDropdownEditor = (options) => {
        return <Dropdown options={[{ label: 'Y', value: true }, { label: 'N', value: false }]} value={options.value} onChange={(e) => options.editorCallback(e.value)} className="w-100" />;
    }
    const onCellEditComplete = (e) => {

        let { rowIndex, newRowData } = e;
        const result = Array.from(value)
        result.splice(rowIndex, 1, newRowData)
        onChange(result)
    }

    return(
       <Card subTitle={`${value.length}개의 옵션`}>
            <DataTable value={value}  
             selectionMode="checkbox"
             selection={selected} 
             onSelectionChange={e => setSelected(e.value)} dataKey="id" scrollable >
            <Column selectionMode="multiple" bodyClassName='text-center' />
            <Column field='label' header="옵션명"/>
            <Column field='value' header="옵션값"/>
            <Column field='isUsed' header="사용유무" bodyClassName="p-0" body={(row, col) => {
                    return row.isUsed===true ? 'Y' : 'N'
                }} editor={(editor) => boolDropdownEditor(editor)} onCellEditComplete={onCellEditComplete} />
             <Column header="삭제" body={(row, col) => {
                    return <Button icon="bi bi-trash" className='p-button-sm p-button-raised p-button-warning  p-button-text'
                    onClick={()=>{
                        const result = Array.from(value)
                        result.splice(col.rowIndex, 1)
                        onChange(result)
                   
                    }} />
                }} />
        </DataTable>
       </Card>
    )
 }