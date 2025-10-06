module.exports = [
"[project]/.next-internal/server/app/sluzby/page/actions.js [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__, module, exports) => {

}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}),
"[project]/src/app/error.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/error.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/node:fs [external] (node:fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:fs", () => require("node:fs"));

module.exports = mod;
}),
"[externals]/node:path [external] (node:path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:path", () => require("node:path"));

module.exports = mod;
}),
"[project]/src/lib/services.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "clearServicesCache",
    ()=>clearServicesCache,
    "getAllServices",
    ()=>getAllServices,
    "getCategories",
    ()=>getCategories,
    "getCategoryName",
    ()=>getCategoryName,
    "getMainServices",
    ()=>getMainServices,
    "getServiceBySlug",
    ()=>getServiceBySlug,
    "getServicesByCategory",
    ()=>getServicesByCategory,
    "priceItemToService",
    ()=>priceItemToService
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:fs [external] (node:fs, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/node:path [external] (node:path, cjs)");
;
;
function parseCSV(csvText) {
    const lines = csvText.split('\n').filter((line)=>line.trim());
    if (lines.length < 2) return [];
    const items = [];
    for(let i = 1; i < lines.length; i++){
        const regex = /^([^,]+),([^,]+),("(?:[^"]|"")*"|[^,]+),([^,]+),([^,]+),("(?:[^"]|"")*"|[^,]*)$/;
        const match = lines[i].match(regex);
        if (match) {
            items.push({
                CategoryId: match[1].trim(),
                CategoryName: match[2].trim(),
                PackageName: match[3].replace(/^"|"$/g, '').replace(/""/g, '"').trim(),
                Price: match[4].trim(),
                Sessions: match[5].trim(),
                Description: match[6].replace(/^"|"$/g, '').replace(/""/g, '"').trim()
            });
        }
    }
    return items;
}
function extractDuration(text) {
    const match = text.match(/(\d+)\s*(min|minut)/i);
    return match ? Number.parseInt(match[1]) : 60;
}
function createSlug(text) {
    return text.toLowerCase().normalize('NFD').replace(/[^ -~]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}
function parsePrice(priceStr) {
    if (priceStr.includes('-')) {
        const parts = priceStr.split('-');
        const min = Number.parseInt(parts[0].replace(/[^\d]/g, ''));
        const max = Number.parseInt(parts[1].replace(/[^\d]/g, ''));
        return {
            min,
            max,
            isVariable: true
        };
    }
    const price = Number.parseInt(priceStr.replace(/[^\d]/g, ''));
    return {
        min: price,
        max: price,
        isVariable: false
    };
}
function priceItemToService(item) {
    const isPackage = item.PackageName.toLowerCase().includes('balíček');
    const { min, max, isVariable } = parsePrice(item.Price);
    return {
        slug: `${createSlug(item.CategoryId)}-${createSlug(item.PackageName)}`,
        name: item.PackageName,
        category: item.CategoryName,
        categoryId: item.CategoryId,
        price: item.Price,
        priceMin: min,
        priceMax: max,
        sessions: item.Sessions,
        duration: extractDuration(item.PackageName),
        description: item.Description,
        isPackage,
        isVariablePrice: isVariable
    };
}
// Cache for parsed services (improves performance)
let servicesCache = null;
function getAllServices() {
    // Return cached version if available
    if (servicesCache) {
        return servicesCache;
    }
    // Parse CSV and cache the result
    const csvPath = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$path__$5b$external$5d$__$28$node$3a$path$2c$__cjs$29$__["default"].join(process.cwd(), 'public', 'pricelist.csv');
    const csvContent = __TURBOPACK__imported__module__$5b$externals$5d2f$node$3a$fs__$5b$external$5d$__$28$node$3a$fs$2c$__cjs$29$__["default"].readFileSync(csvPath, 'utf-8');
    const items = parseCSV(csvContent);
    servicesCache = items.map(priceItemToService);
    return servicesCache;
}
function clearServicesCache() {
    servicesCache = null;
}
function getServiceBySlug(slug) {
    const services = getAllServices();
    return services.find((s)=>s.slug === slug) || null;
}
function getServicesByCategory(categoryId) {
    return getAllServices().filter((s)=>s.categoryId === categoryId);
}
function getMainServices() {
    const all = getAllServices();
    const mainSlugs = [
        'hifu-hifu-facelift-cely-oblicej-bez-ocniho-okoli-60-minut',
        'endosphere-endos-roller-cele-telo-75-minut-skvely-na-rozjeti-celeho-lymfatickeho-systemu',
        'budovani-svalu-budovani-svalu-2-partie-30-minut-bricho-zadek-stehna-zadek-paze-bricho',
        'kosmetika-hydrafacial-standard',
        'kavitace-kavitace-bricho-50minut',
        'kosmetika-osetreni-s-collagenem-anti-age-60-minut',
        'hifu-hifu-facelift-dekolt-60-minut',
        'endosphere-endos-roller-nohy-45-minut'
    ];
    return mainSlugs.map((slug)=>all.find((s)=>s.slug === slug)).filter((s)=>s !== undefined);
}
function getCategories() {
    const services = getAllServices();
    return [
        ...new Set(services.map((s)=>s.categoryId))
    ];
}
function getCategoryName(categoryId) {
    const service = getAllServices().find((s)=>s.categoryId === categoryId);
    return service?.category || categoryId.toUpperCase();
}
}),
"[project]/src/app/sluzby/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ServicesPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/services.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: 'Služby | SW Beauty Hodonín',
    description: 'Kompletní seznam profesionálních kosmetických služeb - HIFU, Endos-roller, budování svalů EMS, kosmetika. Moderní technologie pro viditelné výsledky.',
    keywords: [
        'služby',
        'kosmetické služby',
        'HIFU',
        'Endos-roller',
        'EMS',
        'kosmetika',
        'Hodonín'
    ],
    alternates: {
        canonical: 'https://swbeauty.cz/sluzby'
    }
};
const categoryDescriptions = {
    kosmetika: 'Profesionální péče o pleť s Hydrafacial čištěním a Dermapen mikrojehličkováním pro hydrataci, anti-aging a jasnou pleť',
    hifu: 'Neinvazivní lifting obličeje a těla fokusovaným ultrazvukem - stimuluje kolagen bez operace s výsledky trvajícími měsíce',
    'budovani-svalu': 'Elektrostimulace svalů EMS - 20 minut intenzivního tréninku nahradí hodiny v posilovně, spaluje tuk a buduje svaly',
    endosphere: 'Kompresní mikro-vibrace Endos-roller pro lymfatickou drenáž, redukci celulitidy a tonizaci pokožky bez bolesti',
    kavitace: 'Ultrazvuková lipokavitace pro bezpečnou redukci lokálního tuku, konturování postavy a zlepšení elasticity pleti',
    'ostatni-sluzby': 'Doplňkové služby jako prodlužování řas, depilace voskem a další speciální procedury pro kompletní péči',
    'Prodlužování vlasů': 'Prodlužování vlasů mikro spoji keratinem za tepla nebo studena - přirozený vzhled, pevné spoje, výdrž 3-4 měsíce'
};
function ServicesPage() {
    const categories = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategories"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen bg-white pb-24",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "mx-auto max-w-[1250px] px-6 py-20",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionTitle, {
                    eyebrow: "Kompletní nabídka",
                    title: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            "Služby ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                className: "italic",
                                children: "& Ceny"
                            }, void 0, false, {
                                fileName: "[project]/src/app/sluzby/page.tsx",
                                lineNumber: 41,
                                columnNumber: 22
                            }, void 0)
                        ]
                    }, void 0, true),
                    subtitle: "Vyberte si kategorii a objevte naši nabídku luxusních ošetření s transparentními cenami"
                }, void 0, false, {
                    fileName: "[project]/src/app/sluzby/page.tsx",
                    lineNumber: 37,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
                    children: categories.map((categoryId)=>{
                        const categoryName = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$services$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getCategoryName"])(categoryId);
                        const icon = categoryIcons[categoryId] || '✨';
                        const description = categoryDescriptions[categoryId] || '';
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            href: `/sluzby/${categoryId}`,
                            className: "group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-8 transition-all hover:shadow-soft hover:-translate-y-1",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mb-4 text-4xl",
                                    children: icon
                                }, void 0, false, {
                                    fileName: "[project]/src/app/sluzby/page.tsx",
                                    lineNumber: 59,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "mb-2 text-xl font-medium text-slate-900 group-hover:text-slate-700 transition",
                                    children: categoryName
                                }, void 0, false, {
                                    fileName: "[project]/src/app/sluzby/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm text-slate-600 mb-4",
                                    children: description
                                }, void 0, false, {
                                    fileName: "[project]/src/app/sluzby/page.tsx",
                                    lineNumber: 63,
                                    columnNumber: 17
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "inline-flex items-center text-sm font-medium text-slate-900 group-hover:gap-2 transition-all",
                                    children: [
                                        "Prohlédnout služby",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                                            className: "ml-1 h-4 w-4 transition-transform group-hover:translate-x-1",
                                            fill: "none",
                                            viewBox: "0 0 24 24",
                                            stroke: "currentColor",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                                                    children: "Prohlédnout služby"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/sluzby/page.tsx",
                                                    lineNumber: 72,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                                                    strokeLinecap: "round",
                                                    strokeLinejoin: "round",
                                                    strokeWidth: 2,
                                                    d: "M9 5l7 7-7 7"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/sluzby/page.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/app/sluzby/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/sluzby/page.tsx",
                                    lineNumber: 64,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, categoryId, true, {
                            fileName: "[project]/src/app/sluzby/page.tsx",
                            lineNumber: 54,
                            columnNumber: 15
                        }, this);
                    })
                }, void 0, false, {
                    fileName: "[project]/src/app/sluzby/page.tsx",
                    lineNumber: 47,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "mt-16 text-center",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "rounded-2xl border border-slate-200 bg-slate-50 p-8",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-2xl font-light text-slate-900 mb-3",
                                children: [
                                    "Nevíte si rady s ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                        className: "font-serif italic",
                                        children: "výběrem?"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/sluzby/page.tsx",
                                        lineNumber: 85,
                                        columnNumber: 32
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/sluzby/page.tsx",
                                lineNumber: 84,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-slate-600 mb-6",
                                children: "Objednejte si konzultaci zdarma a my vám poradíme."
                            }, void 0, false, {
                                fileName: "[project]/src/app/sluzby/page.tsx",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                                href: "/rezervace",
                                className: "inline-flex rounded-full bg-slate-900 px-8 py-3 text-sm font-medium text-white transition hover:bg-slate-800",
                                children: "Konzultace zdarma"
                            }, void 0, false, {
                                fileName: "[project]/src/app/sluzby/page.tsx",
                                lineNumber: 88,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/sluzby/page.tsx",
                        lineNumber: 83,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/sluzby/page.tsx",
                    lineNumber: 82,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/sluzby/page.tsx",
            lineNumber: 36,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/app/sluzby/page.tsx",
        lineNumber: 35,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/sluzby/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", ((__turbopack_context__) => {

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/sluzby/page.tsx [app-rsc] (ecmascript)"));
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__bee3def7._.js.map