
export function objectToFormData(obj: any) {
    console.log(obj,'kk');
    let formData = new FormData();
    for (let key in obj) {
        formData.append(key, String(obj[key]));
    }
    console.log(formData,'formData');
    return formData;
}