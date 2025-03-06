export function validateTextValue(value:String):boolean{
    return value.trim() === ""
}

export function validateNumberValue(value:number) : boolean{
    return value.toString() === "" || value < 0
}