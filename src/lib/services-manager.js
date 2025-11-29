// Service image switching logic

export function initServicesManager() {
  // Set up global service functions
  window.changeServiceImage = changeServiceImage
}

export function changeServiceImage(imageId) {
  // Hide all service images
  document.querySelectorAll('#serviceImages img').forEach(img => {
    img.classList.remove('opacity-100')
    img.classList.add('opacity-0')
  })

  // Show the selected image
  const targetImg = document.getElementById(imageId)
  if (targetImg) {
    targetImg.classList.remove('opacity-0')
    targetImg.classList.add('opacity-100')
  }
}
