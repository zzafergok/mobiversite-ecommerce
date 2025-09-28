/* eslint-disable no-case-declarations */
// Vercel API endpoint for JSON Server compatibility
// This creates a serverless function that mimics json-server

export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  // Import static data
  const db = {
    products: [
      {
        id: '1',
        title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
        price: 109.95,
        description:
          'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
        category: "men's clothing",
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '2',
        title: 'Mens Casual Premium Slim Fit T-Shirts',
        price: 22.3,
        description:
          'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing.',
        category: "men's clothing",
        image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '3',
        title: 'Mens Cotton Jacket',
        price: 55.99,
        description:
          'Great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors.',
        category: "men's clothing",
        image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '4',
        title: 'Mens Casual Slim Fit',
        price: 15.99,
        description:
          'The color could be slightly different between on the screen and in practice. Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.',
        category: "men's clothing",
        image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '5',
        title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
        price: 695,
        description:
          "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
        category: 'jewelery',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '6',
        title: 'Solid Gold Petite Micropave',
        price: 168,
        description:
          'Satisfaction Guaranteed. Return or exchange any order within 30 days. Designed and sold by Hafeez Center in the United States.',
        category: 'jewelery',
        image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '7',
        title: 'White Gold Plated Princess',
        price: 9.99,
        description:
          "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
        category: 'jewelery',
        image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '8',
        title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
        price: 10.99,
        description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
        category: 'jewelery',
        image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '9',
        title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
        price: 64,
        description:
          "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user's hardware configuration and operating system",
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '10',
        title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
        price: 109,
        description:
          'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5" hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '11',
        title: 'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
        price: 109,
        description:
          '3D NAND flash are applied to deliver high transfer speeds. Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.',
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '12',
        title: 'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
        price: 114,
        description:
          "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '13',
        title: 'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
        price: 599,
        description:
          '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '14',
        title: 'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor',
        price: 999.99,
        description:
          '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag',
        category: 'electronics',
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '15',
        title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
        price: 56.99,
        description:
          'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',
        category: "women's clothing",
        image: 'https://images.unsplash.com/photo-1544441892-794166f1e3be?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '16',
        title: "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
        price: 29.95,
        description:
          '100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON',
        category: "women's clothing",
        image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '17',
        title: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
        price: 39.99,
        description:
          "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
        category: "women's clothing",
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '18',
        title: "MBJ Women's Solid Short Sleeve Boat Neck V",
        price: 9.85,
        description:
          '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
        category: "women's clothing",
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '19',
        title: "Opna Women's Short Sleeve Moisture",
        price: 7.95,
        description:
          '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away from the body and avoid chafing. Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
        category: "women's clothing",
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center',
      },
      {
        id: '20',
        title: 'DANVOUY Womens T Shirt Casual Cotton Short',
        price: 12.99,
        description:
          '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
        category: "women's clothing",
        image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=400&fit=crop&crop=center',
      },
    ],
    users: [
      {
        id: '1',
        username: 'demo',
        password: 'demo123',
        email: 'demo@example.com',
        firstName: 'Demo',
        lastName: 'User',
        createdAt: '2024-01-01T00:00:00.000Z',
      },
    ],
    orders: [],
    carts: [],
  }

  const { method, query } = req
  const { path } = query

  try {
    // Handle different API endpoints
    if (!path || path.length === 0) {
      return res.status(200).json(db)
    }

    const [resource, id] = path
    const data = db[resource]

    if (!data) {
      return res.status(404).json({ error: 'Resource not found' })
    }

    switch (method) {
      case 'GET':
        if (id) {
          const item = Array.isArray(data) ? data.find((item) => item.id === id) : data
          if (!item) {
            return res.status(404).json({ error: 'Item not found' })
          }
          return res.status(200).json(item)
        }

        // Handle query parameters for filtering
        let filteredData = Array.isArray(data) ? [...data] : data

        // Filter by category
        if (req.query.category && Array.isArray(filteredData)) {
          filteredData = filteredData.filter((item) => item.category === req.query.category)
        }

        // Filter by userId
        if (req.query.userId && Array.isArray(filteredData)) {
          filteredData = filteredData.filter((item) => item.userId === req.query.userId)
        }

        // Filter by username and password for login
        if (req.query.username && req.query.password && Array.isArray(filteredData)) {
          filteredData = filteredData.filter(
            (item) => item.username === req.query.username && item.password === req.query.password,
          )
        }

        // Filter by username
        if (req.query.username && Array.isArray(filteredData)) {
          filteredData = filteredData.filter((item) => item.username === req.query.username)
        }

        // Filter by email
        if (req.query.email && Array.isArray(filteredData)) {
          filteredData = filteredData.filter((item) => item.email === req.query.email)
        }

        return res.status(200).json(filteredData)

      case 'POST':
        // For demo purposes, return the posted data with a generated ID
        const newItem = {
          ...req.body,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
        }
        return res.status(201).json(newItem)

      case 'PUT':
      case 'PATCH':
        if (!id) {
          return res.status(400).json({ error: 'ID required for update' })
        }
        // For demo purposes, return the updated data
        const updatedItem = {
          ...req.body,
          id,
          updatedAt: new Date().toISOString(),
        }
        return res.status(200).json(updatedItem)

      case 'DELETE':
        if (!id) {
          return res.status(400).json({ error: 'ID required for delete' })
        }
        return res.status(200).json({ message: 'Item deleted successfully' })

      default:
        res.setHeader('Allow', ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'])
        return res.status(405).json({ error: `Method ${method} not allowed` })
    }
  } catch (error) {
    console.error('API Error:', error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
