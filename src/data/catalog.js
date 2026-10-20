const mk = (group, list) => list.map(([slug, name, base, tint]) => ({ slug, name, group, base, tint }))
export const categories = [
  ...mk('Living', [['sofas','Sofas',32000,'#8a5a3c'],['sofa-cum-beds','Sofa Cum Beds',28000,'#6b4f3a'],['recliners','Recliners',26000,'#5a4a42'],['lounge-chairs','Lounge Chairs',9000,'#a0764f'],['coffee-tables','Coffee Tables',7500,'#7a5230'],['tv-units','TV Units',14000,'#6d4a2f'],['home-temples','Home Temples',11000,'#9a6b3d']]),
  ...mk('Bedroom', [['beds','Beds',24000,'#7b5238'],['king-size-beds','King Size Beds',36000,'#6a4630'],['wardrobes','Wardrobes',22000,'#5e4231'],['mattresses','Mattresses',12000,'#9fa8b8'],['bedside-tables','Bedside Tables',4500,'#8d6444'],['dressing-tables','Dressing Tables',10500,'#a07850']]),
  ...mk('Dining', [['dining-sets','Dining Table Sets',27000,'#7a4f33'],['dining-chairs','Dining Chairs',4800,'#946a46'],['kitchen-cabinets','Kitchen Cabinets',13000,'#64503f'],['bar-cabinets','Bar Cabinets',15000,'#5b3d2b']]),
  ...mk('Storage', [['shoe-racks','Shoe Racks',6500,'#86603f'],['bookshelves','Bookshelves',8500,'#7c5a3a'],['cabinets-sideboards','Cabinets & Sideboards',16000,'#6f4d34'],['chest-of-drawers','Chest of Drawers',11500,'#8b5e3c']]),
  ...mk('Study', [['study-tables','Study Tables',9500,'#9a7048'],['office-chairs','Office Chairs',7200,'#4b5568'],['computer-tables','Computer Tables',8800,'#80593a']]),
  ...mk('Outdoor', [['balcony-sets','Balcony Sets',12500,'#5f7a5a'],['swing-chairs','Swing Chairs',10500,'#8c6a45'],['outdoor-sofas','Outdoor Sofas',31000,'#6e7d65']]),
  ...mk('Decor', [['wall-mirrors','Wall Mirrors',3800,'#b0a08a'],['lamps','Lamps',2900,'#c79a52'],['rugs-carpets','Rugs & Carpets',5400,'#a5653f'],['wall-decor','Wall Decor',2200,'#8d7a62']])
]
export const groups = [...new Set(categories.map(c => c.group))]
const adj = ['Auburn','Cedar','Harbor','Juniper','Maple','Sable']
const woods = ['Sheesham Wood','Mango Wood','Teak Wood','Engineered Wood','Ash Wood']
const finishes = ['Honey Finish','Walnut Finish','Natural Finish','Espresso Finish']
export const products = categories.flatMap((c, ci) => adj.map((a, i) => {
  const mrp = Math.round((c.base * (0.8 + i * 0.12)) / 100) * 100
  const off = 20 + ((ci + i * 7) % 5) * 10
  const w = woods[(ci + i) % 5], f = finishes[(ci + i) % 4], single = c.name.replace(/s$/, '')
  return {
    id: `${c.slug}-${a.toLowerCase()}`, slug: c.slug, cat: c.name, group: c.group, tint: c.tint,
    name: `${a} ${single}`, material: w, finish: f, mrp, price: Math.round((mrp * (100 - off)) / 100 / 10) * 10, off,
    rating: (4 + ((ci * 3 + i) % 10) / 10).toFixed(1), reviews: 20 + ((ci * 17 + i * 31) % 180),
    isNew: i < 2, inStock: (ci + i) % 7 !== 0,
    desc: `The ${a} ${single.toLowerCase()} is sample catalogue data for this demo: ${w.toLowerCase()} build in a ${f.toLowerCase()}, designed for everyday use.`,
    keywords: `${a} ${c.name} ${c.group} ${w}`.toLowerCase()
  }
}))
export const reviews = [
  ['Asha R., Bengaluru', 'Delivery was on schedule and assembly was neat. The finish looks richer in person.'],
  ['Vikram S., Hyderabad', 'Sturdy and comfortable. The proportions suit our small living room well.'],
  ['Meera K., Pune', 'Good value for the quality. Packaging was careful and nothing arrived damaged.']
]
export const inr = n => '₹' + n.toLocaleString('en-IN')
