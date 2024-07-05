const initialValues={
    show:true,
    breadcrumb:[],
    speciality:[],
    formObject:{}
}
export const Reducer=(state=initialValues,action)=>{
switch(action?.type){
    case "SHOW":return {...state,show:action?.data}
    case "BREAD_CRUMB":return {...state,breadcrumb:action?.data}
    case "SPECIALITY":return {speciality:action?.data}
    case"Privider_Form":return {formObject:action?.data}
    default :return state
}
}