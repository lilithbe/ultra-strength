

export const menu =[
    {
        label: 'Home',
        items: [{
            label: 'Main Site', icon: 'pi pi-fw pi-home', to: '/'
        }]
    },
    {
        label: 'Admin Menu',
        items: [
            {label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/admin/'},
            {label: 'Shop', icon: 'bi bi-shop', items: [
                {label: 'Category', icon: 'pi pi-category', to: '/admin/shop/category'},
                {label: 'Product', icon: 'pi pi-category', to: '/admin/shop/product/list'},
                {label: 'Rotate', icon: 'pi pi-category', to: '/admin/shop/rotate/list'},
               
            ]},
            {label: 'Cumunity', icon: 'pi pi-fw pi-home', items: [
                {label: 'category', icon: 'pi pi-fw pi-category', to: '/admin/cumunity/category/list'},
                {label: 'post', icon: 'pi pi-fw pi-category', to: '/admin/cumunity/post/list'},
            ]},
            {label: 'Config', icon: 'pi pi-fw pi-home', items: [
                {label: 'Config', icon: 'pi pi-fw pi-category', to: '/admin/config'},
            ]},
            {label: 'Images', icon: 'pi pi-image', to: '/admin/images'},
        ]
    },
]
export const main_menu = [
    {label:'Home',to:'/',items:[]},
    {label:'about',to:'/about',items:[]},
]