// CSV Parser
function parseCSV(text) {
    const lines = text.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/\r/g, ''));
    const data = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVLine(lines[i]);
        const obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index] ? values[index].trim().replace(/\r/g, '') : '';
        });
        data.push(obj);
    }

    return data;
}

function parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
        const char = line[i];

        if (char === '"') {
            inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
            result.push(current);
            current = '';
        } else {
            current += char;
        }
    }
    result.push(current);

    return result.map(v => v.replace(/^"|"$/g, ''));
}

// Global data storage
let servicesData = [];
let pricesData = [];

// Image URL mapping for Vercel Blob Storage
// Image URL mapping removed - using direct URLs from CSV

// Helper function to get image URL
function getImageUrl(imagePath) {
    if (!imagePath) return '';

    // Return URL directly if it's already a full URL (from Blob)
    if (imagePath.startsWith('http')) {
        return imagePath;
    }

    // Fallback: try local path
    return `images/${imagePath}`;
}

// Change service image on hover (globální funkce)
window.changeServiceImage = function (imageId) {
    document.querySelectorAll('#serviceImages img').forEach(img => {
        img.classList.remove('opacity-100');
        img.classList.add('opacity-0');
    });

    const targetImg = document.getElementById(imageId);
    if (targetImg) {
        targetImg.classList.remove('opacity-0');
        targetImg.classList.add('opacity-100');
    }
};

// Open service detail modal (globální funkce)
window.openServiceDetail = function (serviceId) {
    const service = servicesData.find(s => s.service_id === serviceId);
    if (!service) return;

    const benefits = service.benefits.split(',').filter(b => b.trim());
    const indications = service.indications.split(',').filter(i => i.trim());
    const contraindications = service.contraindications.split(',').filter(c => c.trim());
    const images = service.image.split(';').filter(img => img.trim());

    // Find prices for this service
    const servicePrices = pricesData.filter(p => p.service_id === serviceId);

    const modalHTML = `
        <div id="serviceDetailModal" class="fixed inset-0 z-[80] flex items-center justify-center p-4" onclick="closeServiceDetail()">
            <div class="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"></div>
            
            <div class="relative bg-white w-full max-w-5xl max-h-[90vh] shadow-2xl animate-fade-in-up overflow-hidden flex flex-col" onclick="event.stopPropagation()">
                <button onclick="closeServiceDetail(); openPriceList();" class="absolute top-4 left-4 z-10 p-2 text-stone-400 hover:text-stone-900 transition-colors flex items-center gap-2 font-geist text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left">
                        <path d="m12 19-7-7 7-7"></path>
                        <path d="M19 12H5"></path>
                    </svg>
                    <span class="hidden md:inline">Zpět na ceník</span>
                </button>
                <button onclick="closeServiceDetail()" class="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-stone-900 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x">
                        <path d="M18 6 6 18"></path>
                        <path d="m6 6 12 12"></path>
                    </svg>
                </button>
                
                <div class="overflow-y-auto flex-1" data-lenis-prevent>
                
                <!-- Image Gallery -->
                <div class="w-full h-64 md:h-96 bg-stone-100 relative overflow-hidden">
                    ${images.length > 0 ? `
                        <img src="${getImageUrl(images[0])}" alt="${service.category_name}" class="w-full h-full object-cover">
                    ` : ''}
                    <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-6">
                        <h2 class="text-4xl md:text-5xl font-cormorant text-white font-medium">${service.category_name}</h2>
                    </div>
                </div>
                
                <div class="p-8 md:p-12 space-y-8">
                    <!-- Short Description -->
                    <div>
                        <p class="text-xl text-stone-600 font-light font-geist italic">${service.short_description}</p>
                    </div>
                    
                    <!-- Full Description -->
                    <div>
                        <h3 class="text-2xl font-cormorant text-stone-900 mb-4">O ošetření</h3>
                        <p class="text-stone-600 font-light font-geist leading-relaxed">${service.full_description}</p>
                    </div>
                    
                    <!-- Benefits -->
                    ${benefits.length > 0 ? `
                        <div>
                            <h3 class="text-2xl font-cormorant text-stone-900 mb-4">Přínosy</h3>
                            <ul class="grid grid-cols-1 md:grid-cols-2 gap-3">
                                ${benefits.map(b => `
                                    <li class="flex items-start gap-2 text-stone-600 font-geist">
                                        <svg class="w-5 h-5 text-stone-900 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>
                                        <span>${b.trim()}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <!-- Indications -->
                    ${indications.length > 0 ? `
                        <div>
                            <h3 class="text-2xl font-cormorant text-stone-900 mb-4">Vhodné pro</h3>
                            <div class="flex flex-wrap gap-2">
                                ${indications.map(i => `
                                    <span class="px-3 py-1 bg-stone-100 text-stone-700 text-sm font-geist">${i.trim()}</span>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <!-- Contraindications -->
                    ${contraindications.length > 0 ? `
                        <div class="bg-amber-50 border border-amber-200 p-6">
                            <h3 class="text-xl font-cormorant text-amber-900 mb-3">Kontraindikace</h3>
                            <ul class="space-y-2">
                                ${contraindications.map(c => `
                                    <li class="flex items-start gap-2 text-amber-800 text-sm font-geist">
                                        <svg class="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                        <span>${c.trim()}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <!-- Prices -->
                    ${servicePrices.length > 0 ? `
                        <div>
                            <h3 class="text-2xl font-cormorant text-stone-900 mb-4">Ceník</h3>
                            <div class="space-y-3">
                                ${servicePrices.map(price => `
                                    <div class="flex justify-between items-center gap-4 border-b border-stone-100 pb-3">
                                        <div class="flex-1">
                                            <span class="font-geist text-stone-900">${price.name}</span>
                                            ${price.duration_in_minutes ? `<span class="text-sm text-stone-400 ml-2">(${price.duration_in_minutes} min)</span>` : ''}
                                            ${price.session > 1 ? `<span class="text-sm text-stone-400 ml-2">• ${price.session}x</span>` : ''}
                                        </div>
                                        <div class="flex items-center gap-3 flex-shrink-0">
                                            <span class="font-geist font-medium text-stone-900 whitespace-nowrap">${price.price_in_czk} Kč</span>
                                            <button onclick="event.stopPropagation(); closeServiceDetail(); bookPackage('${serviceId}', '${price.name.replace(/'/g, "\\'")}', '${price.price_in_czk}');"
                                                    class="px-3 py-1.5 text-xs uppercase tracking-widest font-geist border border-stone-300 text-stone-600 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all">
                                                Rezervovat
                                            </button>
                                        </div>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    
                    <!-- CTA -->
                    <div class="pt-6 flex gap-4">
                        <button onclick="closeServiceDetail(); openBookingModal();" class="flex-1 bg-stone-900 text-white px-8 py-4 hover:bg-stone-800 transition-colors font-geist text-sm uppercase tracking-widest">
                            Rezervovat termín
                        </button>
                        <button onclick="closeServiceDetail()" class="flex-1 border border-stone-300 text-stone-900 px-8 py-4 hover:border-stone-900 transition-colors font-geist text-sm uppercase tracking-widest">
                            Zavřít
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    // Lenis.stop() is called by openServiceDetail() context
};

window.closeServiceDetail = function () {
    const modal = document.getElementById('serviceDetailModal');
    if (modal) {
        modal.remove();
        // Lenis.start() should be called by the context
    }
};

// Filter price list by category
window.filterPriceList = function (category) {
    const categories = document.querySelectorAll('.price-category');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Update filter button states
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.remove('bg-white', 'text-stone-600');
            btn.classList.add('bg-stone-900', 'text-white');
        } else {
            btn.classList.remove('bg-stone-900', 'text-white');
            btn.classList.add('bg-white', 'text-stone-600');
        }
    });

    // Show/hide categories
    if (category === 'all') {
        categories.forEach(cat => cat.style.display = 'block');
    } else {
        categories.forEach(cat => {
            if (cat.dataset.category === category) {
                cat.style.display = 'block';
            } else {
                cat.style.display = 'none';
            }
        });
    }
};

// Select a service and show its packages dynamically on the same page
window.selectService = function (serviceId) {
    const service = servicesData.find(s => s.service_id === serviceId);
    if (!service) return;

    // Find all packages for this service
    const packages = pricesData.filter(p => p.service_id === serviceId);

    // Update step 1 to show packages
    const step1 = document.getElementById('booking-step-1');
    if (step1) {
        step1.innerHTML = `
            <div class="mb-6 text-center">
                <p class="text-stone-500 font-light italic font-geist text-sm">
                    Vyberte balíček, který vám vyhovuje
                </p>
            </div>
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-geist font-medium text-stone-900">${service.category_name}</h3>
                <button onclick="resetBookingToStepOne()" class="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors font-geist">
                    ← Změnit službu
                </button>
            </div>
            <div class="space-y-3">
                ${packages.map(pkg => `
                    <div class="flex justify-between items-center gap-4 p-4 border border-stone-200 hover:border-stone-900 transition-colors cursor-pointer group"
                         onclick="bookPackageFromStep1('${serviceId}', '${pkg.name.replace(/'/g, "\\'")}', '${pkg.price_in_czk}')">
                        <div class="flex-1">
                            <span class="font-geist text-stone-900 group-hover:text-stone-900">${pkg.name}</span>
                            ${pkg.duration_in_minutes ? `<span class="text-sm text-stone-400 ml-2">(${pkg.duration_in_minutes} min)</span>` : ''}
                            ${pkg.session > 1 ? `<span class="text-sm text-stone-400 ml-2">• ${pkg.session}x</span>` : ''}
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="font-geist font-medium text-stone-900 whitespace-nowrap">${pkg.price_in_czk} Kč</span>
                            <span class="text-xs uppercase tracking-widest text-stone-400 group-hover:text-stone-900 font-geist">Vybrat</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// Book package from step 1 (when user selects service first)
window.bookPackageFromStep1 = function (serviceId, packageName, price) {
    // Find the package in pricesData to get duration
    const packageData = pricesData.find(p =>
        p.service_id === serviceId && p.name === packageName
    );
    const duration = packageData ? packageData.duration_in_minutes : null;

    // Store selected package info
    window.selectedPackage = {
        serviceId: serviceId,
        packageName: packageName,
        price: price,
        duration: duration
    };

    // Move to step 2 (date selection)
    if (typeof currentStep !== 'undefined' && typeof updateSteps === 'function') {
        currentStep = 2;
        updateSteps();
    }
};

// Book a specific package - open booking modal with pre-filled package
window.bookPackage = function (serviceId, packageName, price) {
    // Find the package in pricesData to get duration
    const packageData = pricesData.find(p =>
        p.service_id === serviceId && p.name === packageName
    );
    const duration = packageData ? packageData.duration_in_minutes : null;

    // Store selected package info
    window.selectedPackage = {
        serviceId: serviceId,
        packageName: packageName,
        price: price,
        duration: duration
    };

    // Close price list modal
    const priceListModal = document.getElementById('priceListModal');
    if (priceListModal) {
        priceListModal.classList.add('hidden');
    }

    // Find the service name
    const service = servicesData.find(s => s.service_id === serviceId);
    const serviceName = service ? service.category_name : '';

    // Format duration
    let durationText = '';
    if (duration) {
        if (duration >= 60) {
            const hours = Math.floor(duration / 60);
            const mins = duration % 60;
            if (mins > 0) {
                durationText = `${hours}h ${mins} min`;
            } else {
                durationText = `${hours} ${hours === 1 ? 'hodina' : 'hodiny'}`;
            }
        } else {
            durationText = `${duration} minut`;
        }
    }

    // Update step 1 to show selected package
    const step1 = document.getElementById('booking-step-1');
    if (step1) {
        step1.innerHTML = `
            <div class="mb-6 text-center">
                <p class="text-stone-500 font-light italic font-geist text-sm">
                    Váš vybraný balíček
                </p>
            </div>
            <div class="bg-stone-50 border border-stone-200 p-6">
                <h3 class="text-xl font-geist font-medium text-stone-900 mb-4">Vybraný balíček</h3>
                <div class="space-y-2">
                    <p class="font-cormorant text-2xl text-stone-900">${serviceName}</p>
                    <p class="font-geist text-stone-600">${packageName}</p>
                    ${durationText ? `<p class="font-geist text-sm text-stone-500">${durationText}</p>` : ''}
                    <p class="font-geist font-medium text-stone-900">${price} Kč</p>
                </div>
                <button onclick="resetBookingToStepOne()" class="mt-4 text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900 transition-colors font-geist">
                    Změnit výběr
                </button>
            </div>
        `;
    }

    // Use the global openBookingModal function that handles Lenis properly
    if (typeof openBookingModal === 'function') {
        openBookingModal();

        // Skip to step 2 (date selection) since package is already selected
        // Wait a bit for modal to open, then update step
        setTimeout(() => {
            if (typeof currentStep !== 'undefined' && typeof updateSteps === 'function') {
                currentStep = 2;
                updateSteps();
            }
        }, 100);
    }
};


// Reset booking to step one with service selection
window.resetBookingToStepOne = function () {
    window.selectedPackage = null;

    // Reset to step 1
    if (typeof currentStep !== 'undefined' && typeof updateSteps === 'function') {
        currentStep = 1;
        updateSteps();
    }

    // Restore original HTML structure for step 1
    const step1 = document.getElementById('booking-step-1');
    if (step1) {
        step1.innerHTML = `
            <div class="mb-6 text-center">
                <p class="text-stone-500 font-light italic font-geist text-sm">
                    Vyberte si službu, která odpovídá vašim potřebám
                </p>
            </div>
            <h3 class="text-xl font-geist font-medium text-stone-900 mb-6">Vyberte službu</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- Will be populated by renderBookingServices() -->
            </div>
        `;
    }

    // Re-render booking services
    if (typeof renderBookingServices === 'function') {
        renderBookingServices();
    }
};

// Load CSV files
async function loadData() {
    try {
        const [servicesResponse, pricesResponse] = await Promise.all([
            fetch('services.csv'),
            fetch('prices.csv')
        ]);

        const servicesText = await servicesResponse.text();
        const pricesText = await pricesResponse.text();

        servicesData = parseCSV(servicesText);
        pricesData = parseCSV(pricesText);

        console.log('Services loaded:', servicesData.length);
        console.log('Prices loaded:', pricesData.length);

        renderServices();
        renderPriceList();
        renderBookingServices();
        renderGiftCardServices();

    } catch (error) {
        console.error('Error loading data:', error);
    }
}

// Render services section
function renderServices() {
    const servicesList = document.getElementById('servicesList');
    if (!servicesList) return;

    servicesList.innerHTML = servicesData.map((service, index) => {
        const imageId = `img-${service.service_id}`;
        return `
            <div class="service-item group cursor-pointer" 
                 data-service-index="${index}"
                 data-image-id="${imageId}"
                 onclick="openServiceDetail('${service.service_id}')">
                <h3 class="text-5xl md:text-6xl lg:text-7xl font-medium font-cormorant text-stone-200 group-hover:text-stone-900 transition-colors duration-500">
                    ${service.category_name}
                </h3>
            </div>
        `;
    }).join('');

    // Update service images
    const serviceImages = document.getElementById('serviceImages');
    if (serviceImages) {
        serviceImages.innerHTML = servicesData.map((service, index) => {
            const images = service.image.split(';');
            const firstImage = images[0];
            const imageId = `img-${service.service_id}`;

            return `
                <img id="${imageId}"
                     src="${getImageUrl(firstImage)}"
                     class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${index === 0 ? 'opacity-100' : 'opacity-0'}"
                     alt="${service.category_name}">
            `;
        }).join('') + `<div class="absolute inset-0 bg-stone-900/5 pointer-events-none"></div>`;
    }

    // Setup scroll-based image switching
    setupScrollImageSwitch();
}

// Setup viewport-wide cursor tracking for service images
function setupScrollImageSwitch() {
    const servicesList = document.getElementById('servicesList');
    const serviceItems = servicesList?.querySelectorAll('.service-item');

    if (!serviceItems || serviceItems.length === 0) return;

    let throttleTimer = null;
    let currentImageIndex = 0;

    function handleMouseMove(e) {
        // Don't change images if any modal is open
        if (window.isModalOpen) return;

        // Throttle to ~60fps for performance
        if (throttleTimer) return;

        throttleTimer = setTimeout(() => {
            throttleTimer = null;
        }, 16);

        // Get Y position of cursor relative to viewport
        const mouseY = e.clientY;

        // Find which service the mouse is currently over
        let targetIndex = -1;

        serviceItems.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            // Check if mouse Y is within this service item's vertical bounds
            if (mouseY >= rect.top && mouseY <= rect.bottom) {
                targetIndex = index;
            }
        });

        // If mouse isn't over any service, find the closest one
        if (targetIndex === -1) {
            let minDistance = Infinity;
            serviceItems.forEach((item, index) => {
                const rect = item.getBoundingClientRect();
                const itemCenterY = rect.top + rect.height / 2;
                const distance = Math.abs(mouseY - itemCenterY);

                if (distance < minDistance) {
                    minDistance = distance;
                    targetIndex = index;
                }
            });
        }

        // Only update if index changed (avoid unnecessary DOM manipulation)
        if (targetIndex !== -1 && targetIndex !== currentImageIndex) {
            currentImageIndex = targetIndex;
            changeServiceImageByIndex(targetIndex);
        }
    }

    // Listen to mousemove on the entire window for viewport-wide tracking
    window.addEventListener('mousemove', handleMouseMove);
}

// Change service image by index AND highlight the active service name
function changeServiceImageByIndex(index) {
    const images = document.querySelectorAll('#serviceImages img');
    const serviceItems = document.querySelectorAll('#servicesList .service-item');

    // Change images
    images.forEach((img, i) => {
        if (i === index) {
            img.classList.remove('opacity-0');
            img.classList.add('opacity-100');
        } else {
            img.classList.remove('opacity-100');
            img.classList.add('opacity-0');
        }
    });

    // Highlight active service name
    serviceItems.forEach((item, i) => {
        const h3 = item.querySelector('h3');
        if (!h3) return;

        if (i === index) {
            // Active state - dark text
            h3.classList.remove('text-stone-200');
            h3.classList.add('text-stone-900');
        } else {
            // Inactive state - light text
            h3.classList.remove('text-stone-900');
            h3.classList.add('text-stone-200');
        }
    });
}


// Render price list modal
function renderPriceList() {
    const priceListContainer = document.querySelector('#priceListModal .overflow-y-auto');
    if (!priceListContainer) return;

    // Get unique categories from services
    const categories = [...new Set(servicesData.map(s => s.service_id))];

    // Create filter buttons
    const filterHTML = `
        <div class="sticky top-0 bg-white/95 backdrop-blur-sm z-20 pb-4 mb-6 border-b border-stone-200 shadow-sm">
            <div class="flex flex-wrap gap-2">
                <button onclick="filterPriceList('all')" 
                        data-filter="all"
                        class="filter-btn px-4 py-2 text-xs uppercase tracking-widest font-geist border border-stone-200 hover:border-stone-900 transition-colors bg-stone-900 text-white">
                    Vše
                </button>
                ${categories.map(categoryId => {
        const service = servicesData.find(s => s.service_id === categoryId);
        if (!service) return '';
        return `
                        <button onclick="filterPriceList('${categoryId}')" 
                                data-filter="${categoryId}"
                                class="filter-btn px-4 py-2 text-xs uppercase tracking-widest font-geist border border-stone-200 hover:border-stone-900 transition-colors text-stone-600">
                            ${service.category_name}
                        </button>
                    `;
    }).join('')}
            </div>
        </div>
    `;

    // Group prices by service
    const groupedPrices = {};
    pricesData.forEach(price => {
        if (!groupedPrices[price.service_id]) {
            groupedPrices[price.service_id] = [];
        }
        groupedPrices[price.service_id].push(price);
    });

    let html = '';

    Object.keys(groupedPrices).forEach(serviceId => {
        const service = servicesData.find(s => s.service_id === serviceId);
        const prices = groupedPrices[serviceId];

        if (!service) return;

        html += `
            <div class="price-category" data-category="${serviceId}">
                <h3 class="font-cormorant text-2xl text-stone-900 mb-6 border-b border-stone-100 pb-2 cursor-pointer hover:text-stone-600 transition-colors"
                    onclick="openServiceDetail('${serviceId}')">
                    ${service.category_name}
                </h3>
                <div class="space-y-6 md:space-y-4">
                    ${prices.map(price => `
                        <div class="flex justify-between items-center gap-4 group">
                            <div class="flex-1 pr-4 cursor-pointer" onclick="openServiceDetail('${serviceId}')">
                                <span class="font-geist text-stone-600 group-hover:text-stone-900 transition-colors text-sm md:text-base">
                                    ${price.name}
                                </span>
                                ${price.duration_in_minutes ? `<span class="text-xs text-stone-400 ml-2">(${price.duration_in_minutes} min)</span>` : ''}
                                ${price.session > 1 ? `<span class="text-xs text-stone-400 ml-2">• ${price.session} ošetření</span>` : ''}
                            </div>
                            <div class="flex items-center gap-3 flex-shrink-0">
                                <span class="font-geist font-medium text-stone-900 text-sm md:text-base whitespace-nowrap">
                                    ${price.price_in_czk} Kč
                                </span>
                                <button onclick="event.stopPropagation(); bookPackage('${serviceId}', '${price.name.replace(/'/g, "\\'")}', '${price.price_in_czk}');"
                                        class="px-3 py-1.5 text-xs uppercase tracking-widest font-geist border border-stone-300 text-stone-600 hover:border-stone-900 hover:bg-stone-900 hover:text-white transition-all">
                                    Rezervovat
                                </button>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    priceListContainer.innerHTML = filterHTML + `<div class="space-y-10 md:space-y-12 pb-24 md:pb-12">${html}</div>`;
}

// Render booking services
function renderBookingServices() {
    const bookingStep1 = document.getElementById('booking-step-1');
    if (!bookingStep1) return;

    const servicesGrid = bookingStep1.querySelector('.grid');
    if (!servicesGrid) return;

    // Group prices by service for display
    const serviceOptions = servicesData.map(service => {
        const servicePrices = pricesData.filter(p => p.service_id === service.service_id);
        const priceRange = servicePrices.length > 0
            ? `od ${Math.min(...servicePrices.map(p => parseInt(p.price_in_czk)))} Kč`
            : 'Cena na dotaz';

        return {
            id: service.service_id,
            name: service.category_name,
            description: service.short_description,
            priceRange: priceRange
        };
    });

    servicesGrid.innerHTML = serviceOptions.map(service => `
        <button onclick="selectService('${service.id}')" 
                class="text-left p-6 border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all group">
            <span class="block font-cormorant text-2xl mb-2 text-stone-900">${service.name}</span>
            <span class="block font-geist text-sm text-stone-500 mb-4">${service.description}</span>
            <span class="block font-geist text-xs uppercase tracking-widest text-stone-400 group-hover:text-stone-900">
                ${service.priceRange}
            </span>
        </button>
    `).join('');
}

// Render gift card services
function renderGiftCardServices() {
    const servicesGrid = document.getElementById('giftCardServicesGrid');
    if (!servicesGrid) return;

    // Group prices by service for display
    const serviceOptions = servicesData.map(service => {
        const servicePrices = pricesData.filter(p => p.service_id === service.service_id);
        const priceRange = servicePrices.length > 0
            ? `od ${Math.min(...servicePrices.map(p => parseInt(p.price_in_czk)))} Kč`
            : 'Cena na dotaz';

        return {
            id: service.service_id,
            name: service.category_name,
            description: service.short_description,
            priceRange: priceRange
        };
    });

    servicesGrid.innerHTML = serviceOptions.map(service => `
        <button onclick="selectGiftCardService('${service.id}', '${service.name.replace(/'/g, "\\'")}')" type="button"
                class="text-left p-4 border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all group">
            <span class="block font-geist text-sm font-medium mb-1 text-stone-900">${service.name}</span>
            <span class="block font-geist text-xs uppercase tracking-widest text-stone-400 group-hover:text-stone-900">
                ${service.priceRange}
            </span>
        </button>
    `).join('');
}

// Select a service in gift card modal and show its packages
window.selectGiftCardService = function (serviceId, serviceName) {
    const service = servicesData.find(s => s.service_id === serviceId);
    if (!service) return;

    // Find all packages for this service
    const packages = pricesData.filter(p => p.service_id === serviceId);

    // Update packages grid
    const packagesGrid = document.getElementById('giftCardPackagesGrid');
    const packagesContainer = document.getElementById('giftCardPackagesContainer');
    if (!packagesGrid || !packagesContainer) return;

    if (packages.length === 0) {
        packagesGrid.innerHTML = '<p class="text-stone-500 text-center text-sm">Žádné balíčky nejsou k dispozici</p>';
        packagesContainer.classList.remove('hidden');
        return;
    }

    packagesGrid.innerHTML = packages.map(pkg => {
        const duration = pkg.duration_in_minutes
            ? `${pkg.duration_in_minutes} min`
            : '';
        const sessions = pkg.session > 1
            ? `${pkg.session}x ošetření`
            : '1x ošetření';

        return `
            <button onclick="selectGiftCardPackage('${serviceId}', '${serviceName.replace(/'/g, "\\'")}', '${pkg.name.replace(/'/g, "\\'")}', '${pkg.price_in_czk}')" type="button"
                    class="text-left p-4 border border-stone-200 hover:border-stone-900 hover:bg-stone-50 transition-all group">
                <div class="flex justify-between items-start mb-2">
                    <span class="block font-geist text-sm font-medium text-stone-900">${pkg.name}</span>
                    <span class="block font-geist font-medium text-stone-900">${pkg.price_in_czk} Kč</span>
                </div>
                <div class="flex gap-3 text-xs text-stone-500">
                    ${duration ? `<span>⏱ ${duration}</span>` : ''}
                    ${sessions ? `<span>📦 ${sessions}</span>` : ''}
                </div>
            </button>
        `;
    }).join('');

    packagesContainer.classList.remove('hidden');
};

// Select a package in gift card modal
window.selectGiftCardPackage = function (serviceId, serviceName, packageName, price) {
    // Store selected package info
    window.selectedGiftPackage = {
        serviceId: serviceId,
        serviceName: serviceName,
        packageName: packageName,
        price: price
    };

    // Update preview with package name
    const previewValue = document.getElementById('previewValue');
    if (previewValue) {
        previewValue.textContent = packageName;
    }

    // Visual feedback - highlight selected package
    const packagesGrid = document.getElementById('giftCardPackagesGrid');
    if (packagesGrid) {
        packagesGrid.querySelectorAll('button').forEach(btn => {
            btn.classList.remove('bg-stone-900', 'text-white');
            btn.classList.add('hover:bg-stone-50');
        });
        event.target.closest('button').classList.add('bg-stone-900', 'text-white');
        event.target.closest('button').classList.remove('hover:bg-stone-50');
    }
};

// Reset gift card service selection
window.resetGiftCardServiceSelection = function () {
    window.selectedGiftPackage = null;

    // Hide packages container
    const packagesContainer = document.getElementById('giftCardPackagesContainer');
    if (packagesContainer) {
        packagesContainer.classList.add('hidden');
    }

    // Clear packages grid
    const packagesGrid = document.getElementById('giftCardPackagesGrid');
    if (packagesGrid) {
        packagesGrid.innerHTML = '';
    }

    // Reset preview
    const previewValue = document.getElementById('previewValue');
    if (previewValue && document.querySelector('input[name="type"]:checked')?.value === 'service') {
        previewValue.textContent = 'Vyberte službu';
    }

    // Re-render services if needed
    renderGiftCardServices();
};

// Instagram Grid Floating Animations
function initInstagramAnimations() {
    const instagramItems = document.querySelectorAll('.instagram-item');
    if (!instagramItems || instagramItems.length === 0) return;

    gsap.from(instagramItems, {
        scrollTrigger: {
            trigger: '#instagram',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reset'
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: {
            amount: 0.6,
            from: 'start'
        },
        ease: 'power2.out'
    });
}

// Newsletter Form Handling
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletterEmail');
    const messageDiv = document.getElementById('newsletterMessage');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput.value.trim();

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            showNewsletterMessage('Prosím zadejte platný email', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Odesílám...';

        try {
            // TODO: Add backend API endpoint for newsletter subscription
            // For now, simulate success after delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Simulate success
            showNewsletterMessage('✓ Děkujeme! Byli jste úspěšně přihlášeni k odběru newsletteru.', 'success');
            emailInput.value = '';

            // Log for now (until backend is ready)
            console.log('Newsletter subscription:', email);

        } catch (error) {
            showNewsletterMessage('Něco se pokazilo. Zkuste to prosím znovu.', 'error');
            console.error('Newsletter error:', error);
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

function showNewsletterMessage(message, type) {
    const messageDiv = document.getElementById('newsletterMessage');
    if (!messageDiv) return;

    messageDiv.textContent = message;
    messageDiv.classList.remove('hidden', 'text-green-600', 'text-red-600');
    messageDiv.classList.add(type === 'success' ? 'text-green-600' : 'text-red-600');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        messageDiv.classList.add('hidden');
    }, 5000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    initInstagramAnimations();
    initNewsletterForm();
});
