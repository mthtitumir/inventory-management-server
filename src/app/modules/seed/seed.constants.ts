import { TProduct } from "../product/product.interface";

export const dummyProducts: Partial<TProduct>[] = [
    {
        name: "Rose Elegance",
        description: "A delicate floral fragrance with top notes of rose and jasmine.",
        sku: "ROSE001",
        category: "673b6c4bc210129f18c06c94",
        subcategory: "673b6d256f85095f120ca4c5",
        brand: "673b6b9a253b011ea4f43725",
        variants: [
            {
                sku: "ROSE001-50ML",
                attributes: [
                    { name: "Size", value: "50ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 49.99,
                quantity: 20,
                status: "in_stock",
                images: ["rose-elegance-50ml.jpg"],
                isDefault: true,
            },
            {
                sku: "ROSE001-100ML",
                attributes: [
                    { name: "Size", value: "100ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 89.99,
                quantity: 15,
                status: "in_stock",
                images: ["rose-elegance-100ml.jpg"],
                isDefault: false,
            }
        ],
        images: [
            { url: "rose-elegance-main.jpg", alt: "Rose Elegance Fragrance" },
            { url: "rose-elegance-2.jpg", alt: "Rose Elegance Bottle" }
        ],
        seo: {
            title: "Rose Elegance Eau de Parfum",
            description: "A floral fragrance for romantic occasions.",
            keywords: ["rose perfume", "floral fragrance", "eau de parfum"]
        },
        ratingsAverage: 4.5,
        ratingsCount: 32,
        tags: ["Floral", "Romantic", "Classic"],
        isFeatured: true,
        isNewArrival: false,
    },
    {
        name: "Citrus Burst",
        description: "A fresh and zesty perfume with notes of lemon, lime, and orange.",
        sku: "CITRUS001",
        category: "673b6c4bc210129f18c06c94",
        subcategory: "673b6d256f85095f120ca4c5",
        brand: "673b6b9a253b011ea4f43728",
        variants: [
            {
                sku: "CITRUS001-50ML",
                attributes: [
                    { name: "Size", value: "50ml" },
                    { name: "Type", value: "Eau de Toilette" }
                ],
                price: 39.99,
                quantity: 30,
                status: "in_stock",
                images: ["citrus-burst-50ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "citrus-burst-main.jpg", alt: "Citrus Burst Fragrance" },
            { url: "citrus-burst-2.jpg", alt: "Citrus Burst Bottle" }
        ],
        seo: {
            title: "Citrus Burst Eau de Toilette",
            description: "A refreshing fragrance perfect for summer.",
            keywords: ["citrus perfume", "fresh fragrance", "eau de toilette"]
        },
        ratingsAverage: 4.2,
        ratingsCount: 12,
        tags: ["Citrus", "Fresh", "Summer"],
        isFeatured: false,
        isNewArrival: true,
    },
    {
        name: "Vanilla Dream",
        description: "A warm and sweet fragrance with vanilla, caramel, and hints of chocolate.",
        sku: "VANILLA001",
        category: "673b6c4bc210129f18c06c96",
        subcategory: "673b6d256f85095f120ca4c9",
        brand: "673b6b9a253b011ea4f43729",
        variants: [
            {
                sku: "VANILLA001-30ML",
                attributes: [
                    { name: "Size", value: "30ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 29.99,
                quantity: 50,
                status: "in_stock",
                images: ["vanilla-dream-30ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "vanilla-dream-main.jpg", alt: "Vanilla Dream Fragrance" },
            { url: "vanilla-dream-2.jpg", alt: "Vanilla Dream Bottle" }
        ],
        seo: {
            title: "Vanilla Dream Eau de Parfum",
            description: "A sweet, indulgent fragrance with vanilla and caramel.",
            keywords: ["vanilla perfume", "sweet fragrance", "caramel scent"]
        },
        ratingsAverage: 4.8,
        ratingsCount: 50,
        tags: ["Sweet", "Indulgent", "Cozy"],
        isFeatured: true,
        isNewArrival: false,
    },
    {
        name: "Ocean Breeze",
        description: "A light and airy fragrance with oceanic and floral notes.",
        sku: "OCEAN001",
        category: "673b6c4bc210129f18c06c96",
        subcategory: "673b6d256f85095f120ca4c9",
        brand: "673b6b9a253b011ea4f43722",
        variants: [
            {
                sku: "OCEAN001-50ML",
                attributes: [
                    { name: "Size", value: "50ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 59.99,
                quantity: 12,
                status: "in_stock",
                images: ["ocean-breeze-50ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "ocean-breeze-main.jpg", alt: "Ocean Breeze Fragrance" },
            { url: "ocean-breeze-2.jpg", alt: "Ocean Breeze Bottle" }
        ],
        seo: {
            title: "Ocean Breeze Eau de Parfum",
            description: "A refreshing, oceanic fragrance with floral undertones.",
            keywords: ["ocean fragrance", "fresh perfume", "eau de parfum"]
        },
        ratingsAverage: 4.3,
        ratingsCount: 18,
        tags: ["Aquatic", "Fresh", "Cool"],
        isFeatured: false,
        isNewArrival: true,
    },
    {
        name: "Midnight Woods",
        description: "A deep and mysterious fragrance with woody and smoky notes.",
        sku: "MIDNIGHT001",
        category: "673b6c4bc210129f18c06c99",
        subcategory: "673b6d256f85095f120ca4d0",
        brand: "673b6b9a253b011ea4f43723",
        variants: [
            {
                sku: "MIDNIGHT001-100ML",
                attributes: [
                    { name: "Size", value: "100ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 79.99,
                quantity: 8,
                status: "in_stock",
                images: ["midnight-woods-100ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "midnight-woods-main.jpg", alt: "Midnight Woods Fragrance" },
            { url: "midnight-woods-2.jpg", alt: "Midnight Woods Bottle" }
        ],
        seo: {
            title: "Midnight Woods Eau de Parfum",
            description: "A smoky and woody fragrance perfect for evening wear.",
            keywords: ["woody perfume", "smoky fragrance", "eau de parfum"]
        },
        ratingsAverage: 4.7,
        ratingsCount: 22,
        tags: ["Woody", "Mysterious", "Evening"],
        isFeatured: false,
        isNewArrival: false,
    },
    {
        name: "Lavender Essence",
        description: "A calming and soothing fragrance with pure lavender essence.",
        sku: "LAVENDER001",
        category: "673b6c4bc210129f18c06c99",
        subcategory: "673b6d256f85095f120ca4d0",
        brand: "673b6b9a253b011ea4f43724",
        variants: [
            {
                sku: "LAVENDER001-30ML",
                attributes: [
                    { name: "Size", value: "30ml" },
                    { name: "Type", value: "Eau de Toilette" }
                ],
                price: 34.99,
                quantity: 25,
                status: "in_stock",
                images: ["lavender-essence-30ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "lavender-essence-main.jpg", alt: "Lavender Essence Fragrance" },
            { url: "lavender-essence-2.jpg", alt: "Lavender Essence Bottle" }
        ],
        seo: {
            title: "Lavender Essence Eau de Toilette",
            description: "A floral fragrance with the calming scent of lavender.",
            keywords: ["lavender perfume", "calming fragrance", "eau de toilette"]
        },
        ratingsAverage: 4.6,
        ratingsCount: 16,
        tags: ["Floral", "Calming", "Relaxing"],
        isFeatured: false,
        isNewArrival: false,
    },
    {
        name: "Spicy Amber",
        description: "A warm, spicy fragrance with notes of amber, cinnamon, and musk.",
        sku: "SPICYAMBER001",
        category: "673b6c4bc210129f18c06c93",
        subcategory: "673b6d256f85095f120ca4c4",
        brand: "673b6b9a253b011ea4f43726",
        variants: [
            {
                sku: "SPICYAMBER001-50ML",
                attributes: [
                    { name: "Size", value: "50ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 59.99,
                quantity: 22,
                status: "in_stock",
                images: ["spicy-amber-50ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "spicy-amber-main.jpg", alt: "Spicy Amber Fragrance" },
            { url: "spicy-amber-2.jpg", alt: "Spicy Amber Bottle" }
        ],
        seo: {
            title: "Spicy Amber Eau de Parfum",
            description: "A rich and spicy fragrance with hints of amber and cinnamon.",
            keywords: ["amber perfume", "spicy fragrance", "cinnamon scent"]
        },
        ratingsAverage: 4.4,
        ratingsCount: 27,
        tags: ["Spicy", "Warm", "Sensual"],
        isFeatured: false,
        isNewArrival: false,
    },
    {
        name: "Peach Blossom",
        description: "A sweet and fruity fragrance with top notes of peach, apple, and rose.",
        sku: "PEACHBLOSSOM001",
        category: "673b6c4bc210129f18c06c93",
        subcategory: "673b6d256f85095f120ca4c4",
        brand: "673b6b9a253b011ea4f43727",
        variants: [
            {
                sku: "PEACHBLOSSOM001-50ML",
                attributes: [
                    { name: "Size", value: "50ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 49.99,
                quantity: 40,
                status: "in_stock",
                images: ["peach-blossom-50ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "peach-blossom-main.jpg", alt: "Peach Blossom Fragrance" },
            { url: "peach-blossom-2.jpg", alt: "Peach Blossom Bottle" }
        ],
        seo: {
            title: "Peach Blossom Eau de Parfum",
            description: "A refreshing, fruity fragrance perfect for spring.",
            keywords: ["peach perfume", "fruity fragrance", "rose scent"]
        },
        ratingsAverage: 4.6,
        ratingsCount: 15,
        tags: ["Fruity", "Sweet", "Spring"],
        isFeatured: true,
        isNewArrival: true,
    },
    {
        name: "Smoky Leather",
        description: "A bold, smoky fragrance with leather, tobacco, and vanilla.",
        sku: "SMOKYLEATHER001",
        category: "673b6c4bc210129f18c06c95",
        subcategory: "673b6d256f85095f120ca4c7",
        brand: "673b6b9a253b011ea4f4372a",
        variants: [
            {
                sku: "SMOKYLEATHER001-100ML",
                attributes: [
                    { name: "Size", value: "100ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 89.99,
                quantity: 10,
                status: "pre_order",
                images: ["smoky-leather-100ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "smoky-leather-main.jpg", alt: "Smoky Leather Fragrance" },
            { url: "smoky-leather-2.jpg", alt: "Smoky Leather Bottle" }
        ],
        seo: {
            title: "Smoky Leather Eau de Parfum",
            description: "A rugged fragrance combining smoky leather and vanilla notes.",
            keywords: ["leather perfume", "smoky fragrance", "tobacco scent"]
        },
        ratingsAverage: 4.7,
        ratingsCount: 9,
        tags: ["Woody", "Leather", "Bold"],
        isFeatured: false,
        isNewArrival: false,
    },
    {
        name: "Wild Orchid",
        description: "A delicate floral fragrance with orchid, lily, and sandalwood.",
        sku: "WILDORCHID001",
        category: "673b6c4bc210129f18c06c95",
        subcategory: "673b6d256f85095f120ca4c7",
        brand: "673b6b9a253b011ea4f4372b",
        variants: [
            {
                sku: "WILDORCHID001-50ML",
                attributes: [
                    { name: "Size", value: "50ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 54.99,
                quantity: 18,
                status: "in_stock",
                images: ["wild-orchid-50ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "wild-orchid-main.jpg", alt: "Wild Orchid Fragrance" },
            { url: "wild-orchid-2.jpg", alt: "Wild Orchid Bottle" }
        ],
        seo: {
            title: "Wild Orchid Eau de Parfum",
            description: "A luxurious floral fragrance with rich notes of orchid and sandalwood.",
            keywords: ["orchid perfume", "floral fragrance", "sandalwood scent"]
        },
        ratingsAverage: 4.9,
        ratingsCount: 33,
        tags: ["Floral", "Luxury", "Romantic"],
        isFeatured: true,
        isNewArrival: false,
    },
    {
        name: "Coconut Breeze",
        description: "A tropical fragrance with coconut, pineapple, and a hint of vanilla.",
        sku: "COCONUTBREEZE001",
        category: "673b6c4bc210129f18c06c97",
        subcategory: "673b6d256f85095f120ca4cc",
        brand: "673b6b9a253b011ea4f43725",
        variants: [
            {
                sku: "COCONUTBREEZE001-100ML",
                attributes: [
                    { name: "Size", value: "100ml" },
                    { name: "Type", value: "Eau de Toilette" }
                ],
                price: 69.99,
                quantity: 25,
                status: "in_stock",
                images: ["coconut-breeze-100ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "coconut-breeze-main.jpg", alt: "Coconut Breeze Fragrance" },
            { url: "coconut-breeze-2.jpg", alt: "Coconut Breeze Bottle" }
        ],
        seo: {
            title: "Coconut Breeze Eau de Toilette",
            description: "A refreshing tropical fragrance with a blend of coconut and pineapple.",
            keywords: ["coconut perfume", "tropical fragrance", "pineapple scent"]
        },
        ratingsAverage: 4.3,
        ratingsCount: 24,
        tags: ["Tropical", "Refreshing", "Vacation"],
        isFeatured: false,
        isNewArrival: true,
    },
    {
        name: "Amber Noir",
        description: "A mysterious and dark fragrance with amber, patchouli, and vanilla.",
        sku: "AMBERNOIR001",
        category: "673b6c4bc210129f18c06c97",
        subcategory: "673b6d256f85095f120ca4cc",
        brand: "673b6b9a253b011ea4f43728",
        variants: [
            {
                sku: "AMBERNOIR001-50ML",
                attributes: [
                    { name: "Size", value: "50ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 79.99,
                quantity: 15,
                status: "in_stock",
                images: ["amber-noir-50ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "amber-noir-main.jpg", alt: "Amber Noir Fragrance" },
            { url: "amber-noir-2.jpg", alt: "Amber Noir Bottle" }
        ],
        seo: {
            title: "Amber Noir Eau de Parfum",
            description: "A dark and seductive fragrance with amber and patchouli.",
            keywords: ["amber perfume", "patchouli fragrance", "oriental scent"]
        },
        ratingsAverage: 4.5,
        ratingsCount: 30,
        tags: ["Oriental", "Dark", "Seductive"],
        isFeatured: false,
        isNewArrival: false,
    },
    {
        name: "Rosewood Essence",
        description: "A smooth, woody fragrance with rose, cedar, and sandalwood.",
        sku: "ROSEWOOD001",
        category: "673b6c4bc210129f18c06c97",
        subcategory: "673b6d256f85095f120ca4cc",
        brand: "673b6b9a253b011ea4f43726",
        variants: [
            {
                sku: "ROSEWOOD001-50ML",
                attributes: [
                    { name: "Size", value: "50ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 65.99,
                quantity: 12,
                status: "pre_order",
                images: ["rosewood-50ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "rosewood-main.jpg", alt: "Rosewood Essence Fragrance" },
            { url: "rosewood-2.jpg", alt: "Rosewood Essence Bottle" }
        ],
        seo: {
            title: "Rosewood Essence Eau de Parfum",
            description: "A warm and comforting fragrance combining rosewood, cedar, and sandalwood.",
            keywords: ["rosewood perfume", "woody fragrance", "sandalwood scent"]
        },
        ratingsAverage: 4.2,
        ratingsCount: 19,
        tags: ["Woody", "Comforting", "Luxury"],
        isFeatured: true,
        isNewArrival: true,
    },
    {
        name: "Golden Oud",
        description: "A rich, smoky fragrance with oud, saffron, and rose.",
        sku: "GOLDENOUD001",
        category: "673b6c4bc210129f18c06c98",
        subcategory: "673b6d256f85095f120ca4ce",
        brand: "673b6b9a253b011ea4f4372a",
        variants: [
            {
                sku: "GOLDENOUD001-100ML",
                attributes: [
                    { name: "Size", value: "100ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 149.99,
                quantity: 8,
                status: "pre_order",
                images: ["golden-oud-100ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "golden-oud-main.jpg", alt: "Golden Oud Fragrance" },
            { url: "golden-oud-2.jpg", alt: "Golden Oud Bottle" }
        ],
        seo: {
            title: "Golden Oud Eau de Parfum",
            description: "A luxurious fragrance with oud, saffron, and rose.",
            keywords: ["oud perfume", "luxury fragrance", "saffron scent"]
        },
        ratingsAverage: 4.8,
        ratingsCount: 11,
        tags: ["Luxury", "Oriental", "Rich"],
        isFeatured: false,
        isNewArrival: false,
    },
    {
        name: "Lavender Dreams",
        description: "A calming fragrance with lavender, bergamot, and chamomile.",
        sku: "LAVENDREAMS001",
        category: "673b6c4bc210129f18c06c98",
        subcategory: "673b6d256f85095f120ca4ce",
        brand: "673b6b9a253b011ea4f43729",
        variants: [
            {
                sku: "LAVENDREAMS001-50ML",
                attributes: [
                    { name: "Size", value: "50ml" },
                    { name: "Type", value: "Eau de Parfum" }
                ],
                price: 49.99,
                quantity: 30,
                status: "in_stock",
                images: ["lavender-dreams-50ml.jpg"],
                isDefault: true,
            }
        ],
        images: [
            { url: "lavender-dreams-main.jpg", alt: "Lavender Dreams Fragrance" },
            { url: "lavender-dreams-2.jpg", alt: "Lavender Dreams Bottle" }
        ],
        seo: {
            title: "Lavender Dreams Eau de Parfum",
            description: "A soothing fragrance with lavender and chamomile for peaceful moments.",
            keywords: ["lavender perfume", "chamomile fragrance", "relaxing scent"]
        },
        ratingsAverage: 4.5,
        ratingsCount: 38,
        tags: ["Floral", "Relaxing", "Calming"],
        isFeatured: true,
        isNewArrival: false,
    }
];

