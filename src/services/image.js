
export const imageToBase64 = (image) => {
  
  if(!image || image == "" || image.name === undefined){
    return
  }

  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.readAsDataURL(image)
  })
}

export const Base64ToImage = (base64Image) => {
  
  if(!base64Image || base64Image == ""){
    return
  }
  
  return 'data:image/png;base64, '+ base64Image
  
}