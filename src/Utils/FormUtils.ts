
export function objectToFormData(obj: any) {
    console.log(obj, 'kk');
    let formData = new FormData();
    for (let key in obj) {
        formData.append(key, String(obj[key]));
    }
    return formData;
}

export const formatNumber = (number: number) => {
    return new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(number);
};