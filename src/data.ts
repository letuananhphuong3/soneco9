/**
 * Data and types for the G9ECO website
 */

export interface Product {
  id: string;
  name: string;
  category: 'primer' | 'topcoat' | 'waterproof' | 'putty' | 'special' | 'epoxy' | 'industrial' | 'traffic';
  description: { vi: string; en: string };
  features: { vi: string[]; en: string[] };
  image: string;
  coverage: string;
  spec?: string;
  dryingTime: { vi: string; en: string };
  price?: string;
}

export const PRODUCTS: Product[] = [
  // BỘT BẢ
  {
    id: 'G9B1',
    name: 'Bột bả nội thất cao cấp G9B1',
    category: 'putty',
    description: {
      vi: 'Là một sản phẩm trộn sẵn gốc Cement chuyên dùng làm lớp phủ hoàn thiện cuối cùng cho bề mặt bê tông hay vữa trát trong nhà trước khi sơn nhằm tạo ra bề mặt phẳng, mịn màng.',
      en: 'Pre-mixed cement-based product used as the final finishing coat for indoor concrete or mortar surfaces before painting to create a flat, smooth surface.'
    },
    features: {
      vi: ['Chống rạn nứt', 'Độ bám dính cao', 'Bề mặt phẳng mịn'],
      en: ['Crack resistant', 'High adhesion', 'Smooth flat surface']
    },
    image: 'https://i.imgur.com/QiYzaDC.jpeg',
    coverage: '1-1.3 kg/m²',
    dryingTime: {
      vi: 'Khô bề mặt: 2 giờ, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 2 hours, Next coat: 3 hours'
    },
    price: '359,000'
  },
  {
    id: 'G9B2',
    name: 'Bột bả ngoại thất cao cấp G9B2',
    category: 'putty',
    description: {
      vi: 'Là nguyên liệu xử lý bề mặt, dùng để trám các lỗ hổng lớn, nhỏ và lấp vá các bề mặt hồ vữa hay bê tông không bằng phẳng cho tường ngoại thất.',
      en: 'Surface treatment material used to fill large and small holes and patch uneven mortar or concrete surfaces for exterior walls.'
    },
    features: {
      vi: ['Chống rạn nứt', 'Chịu va đập cao', 'Chuyên dụng ngoại thất'],
      en: ['Crack resistant', 'High impact resistance', 'Specialized for exterior']
    },
    image: 'https://i.imgur.com/OlxMoYw.jpeg',
    coverage: '1-1.3 kg/m²',
    dryingTime: {
      vi: 'Khô bề mặt: 2 giờ, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 2 hours, Next coat: 3 hours'
    },
    price: '448,000'
  },
  // SƠN CHỐNG THẤM
  {
    id: 'G5.5',
    name: 'Sơn chống thấm pha xi măng G5.5',
    category: 'waterproof',
    description: {
      vi: 'Là chất chống thấm được cấu thành bởi hợp chất Acrylic. Khi sử dụng kết hợp với xi măng theo tỉ lệ 1:1 làm tăng khả năng chống thấm và bám dính cực tốt.',
      en: 'Waterproofing agent composed of Acrylic compounds. When used in combination with cement in a 1:1 ratio, it increases waterproofing capability and provides excellent adhesion.'
    },
    features: {
      vi: ['Gố Acrylic', 'Chống thấm đứng', 'Bám dính cực tốt'],
      en: ['Acrylic based', 'Vertical waterproofing', 'Excellent adhesion']
    },
    image: 'https://i.imgur.com/U8d9ms0.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: Sau 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: After 3 hours'
    },
    price: '2,850,000'
  },
  {
    id: 'G5.6',
    name: 'Sơn chống thấm thượng hạng thế hệ mới G5.6',
    category: 'waterproof',
    description: {
      vi: 'Là loại sơn chống thấm công nghệ mới, chống thấm hiệu quả, đa dạng về màu sắc. Bề mặt bóng, mịn, chống bám bụi bẩn, không cần sơn lót.',
      en: 'New technology waterproofing paint, effective waterproofing, diverse colors. Glossy, smooth surface, dust resistant, no primer needed.'
    },
    features: {
      vi: ['Màng sơn bóng', 'Chống bám bụi', 'Không cần sơn lót'],
      en: ['Glossy film', 'Dust resistant', 'No primer needed']
    },
    image: 'https://i.imgur.com/UDnrKRI.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: Sau 4 giờ',
      en: 'Surface dry: 45 mins, Next coat: After 4 hours'
    },
    price: '4,350,000'
  },
  {
    id: 'G100',
    name: 'Sơn chống thấm 2 thành phần G100',
    category: 'waterproof',
    description: {
      vi: 'Là hợp chất chống thấm đàn hồi gốc xi măng - polymer. Lớp phủ sau khi hình thành có tính đàn hồi tốt, bám dính tuyệt vời, ngăn ngừa thấm nước và che phủ vết nứt.',
      en: 'Flexible cement-polymer based waterproofing compound. After formation, the coating has good elasticity, excellent adhesion, prevents water penetration and bridges cracks.'
    },
    features: {
      vi: ['Gốc xi măng - polymer', 'Tính đàn hồi tốt', 'Che phủ vết nứt'],
      en: ['Cement-polymer based', 'Good elasticity', 'Crack bridging']
    },
    image: 'https://i.imgur.com/0ODEZ99.jpeg',
    coverage: '1-1.2 m²/kg/lớp',
    dryingTime: {
      vi: 'Thi công: <30 phút, Khô hoàn toàn: >4 giờ',
      en: 'Application: <30 mins, Full dry: >4 hours'
    },
    price: '1,775,000'
  },
  // SƠN LÓT NỘI THẤT
  {
    id: 'G6.4',
    name: 'Sơn lót nội thất cao cấp G6.4',
    category: 'primer',
    description: {
      vi: 'Là loại sơn lót cao cấp hướng đến tiêu chuẩn thân thiện môi trường, ít mùi, hàm lượng VOC thấp. Có tính kháng kiềm cao, màng sơn tạo độ bám dính tốt.',
      en: 'Premium primer oriented towards eco-friendly standards, low odor, low VOC. High alkali resistance, coating creates good adhesion.'
    },
    features: {
      vi: ['Ít mùi', 'Kháng kiềm cao', 'Thân thiện môi trường'],
      en: ['Low odor', 'High alkali resistance', 'Eco-friendly']
    },
    image: 'https://i.imgur.com/KjbbMbz.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '1,150,000'
  },
  {
    id: 'G6.5',
    name: 'Sơn lót kháng kiềm nội thất cao cấp G6.5',
    category: 'primer',
    description: {
      vi: 'Là loại sơn lót cao cấp với tính kháng kiềm cao, màng sơn tạo độ bám dính tốt, giúp bảo vệ lớp sơn phủ bền đẹp. Lựa chọn tối ưu cho công trình cao cấp.',
      en: 'Premium primer with high alkali resistance, coating creates good adhesion, helping protect topcoats for long-lasting beauty. Optimal choice for high-end projects.'
    },
    features: {
      vi: ['Kháng kiềm vượt trội', 'Bám dính tuyệt hảo', 'Chuyên dụng cao cấp'],
      en: ['Superior alkali resistance', 'Excellent adhesion', 'High-end specialized']
    },
    image: 'https://i.imgur.com/33ftGnQ.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '2,663,000'
  },
  // SƠN LÓT NGOẠI THẤT
  {
    id: 'G6.6',
    name: 'Sơn lót kháng kiềm ngoại thất kinh tế G6.6',
    category: 'primer',
    description: {
      vi: 'Sơn lót ngoại thất với khả năng kháng kiềm tốt, tăng cường độ bám dính cho lớp sơn phủ, giúp tiết kiệm chi phí mà vẫn đảm bảo chất lượng.',
      en: 'Exterior primer with good alkali resistance, enhances adhesion for topcoats, providing cost savings while ensuring quality.'
    },
    features: {
      vi: ['Kinh tế', 'Kháng kiềm tốt', 'Bám dính ổn định'],
      en: ['Economical', 'Good alkali resistance', 'Stable adhesion']
    },
    image: 'https://i.imgur.com/0YTTedl.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '1,350,000'
  },
  {
    id: 'G6.7',
    name: 'Sơn lót kháng kiềm ngoại thất cao cấp G6.7',
    category: 'primer',
    description: {
      vi: 'Sơn lót cao cấp với tính kháng kiềm vượt trội, bảo vệ công trình khỏi tác động của thời tiết và môi trường khắc nghiệt.',
      en: 'Premium primer with superior alkali resistance, protecting structures from effects of weather and harsh environments.'
    },
    features: {
      vi: ['Kháng kiềm cao', 'Chịu thời tiết', 'Bám dính tuyệt hảo'],
      en: ['High alkali resistance', 'Weather resistant', 'Excellent adhesion']
    },
    image: 'https://i.imgur.com/WIUpYve.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '3,250,000'
  },
  {
    id: 'G9.0',
    name: 'Sơn lót kháng kiềm kháng muối nội thất G9.0',
    category: 'primer',
    description: {
      vi: 'Sơn lót cao cấp gốc nước giúp ngăn chặn hiện tượng cháy kiềm trên bề mặt tường trong nhà. Có khả năng kháng nấm mốc và kháng muối vượt trội.',
      en: 'Water-based premium primer helps prevent alkali burning on indoor walls. Outstanding mold and salt resistance.'
    },
    features: {
      vi: ['Kháng muối', 'Kháng kiềm', 'Tăng độ bền màu'],
      en: ['Salt resistant', 'Alkali resistant', 'Enhances color durability']
    },
    image: 'https://i.imgur.com/9NH6n0j.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '3,150,000'
  },
  {
    id: 'G9.1',
    name: 'Sơn lót kháng kiềm kháng muối ngoại thất G9.1',
    category: 'primer',
    description: {
      vi: 'Sơn lót ngoại thất giúp ngăn chặn sự tích tụ muối canxi, bảo vệ màng sơn phủ luôn bền màu. Thân thiện môi trường và an toàn sức khỏe.',
      en: 'Exterior primer prevents calcium salt buildup, protecting topcoats for color durability. Eco-friendly and safe for health.'
    },
    features: {
      vi: ['Kháng muối kiềm cao', 'Chống loang màu', 'Thân thiện môi trường'],
      en: ['High salt/alkali resistance', 'Prevents color bleeding', 'Eco-friendly']
    },
    image: 'https://i.imgur.com/8kVl6b4.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '3,850,000'
  },
  // SƠN PHỦ NỘI THẤT
  {
    id: 'G8.1',
    name: 'Sơn siêu mịn nội thất cao cấp G8.1',
    category: 'topcoat',
    description: {
      vi: 'Loại sơn phủ hoàn thiện đã hoàn toàn nhiệt đới hóa, phù hợp khí hậu Việt Nam. Dễ thi công, bề mặt mịn màng, độ che phủ cao.',
      en: 'Completely tropicalized finishing paint, suitable for Vietnam climate. Easy to apply, smooth surface, high coverage.'
    },
    features: {
      vi: ['Màng sơn mịn', 'Độ phủ cao', 'Nhiệt đới hóa'],
      en: ['Smooth film', 'High coverage', 'Tropicalized']
    },
    image: 'https://i.imgur.com/orQMBgg.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '1,250,000'
  },
  {
    id: 'G8.2',
    name: 'Sơn bóng Semi nội thất cao cấp G8.2',
    category: 'topcoat',
    description: {
      vi: 'Được cấu tạo bởi keo Pure Acrylic đặc biệt, nhẹ mùi, không ảnh hưởng sức khỏe, giúp bảo vệ tối đa bề mặt tường nội thất.',
      en: 'Composed of special Pure Acrylic resin, low odor, safe for health, provides maximum protection for interior surfaces.'
    },
    features: {
      vi: ['Bóng Semi', 'Nhẹ mùi', 'Kháng khuẩn'],
      en: ['Semi-gloss', 'Low odor', 'Antibacterial']
    },
    image: 'https://i.imgur.com/c1oDTTC.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '2,950,000'
  },
  {
    id: 'G8.4',
    name: 'Sơn nội thất bóng cao cấp G8.4',
    category: 'topcoat',
    description: {
      vi: 'Sơn bóng nội thất thân thiện môi trường, màng sơn bóng đẹp, dễ lau chùi, bền màu với thời gian.',
      en: 'Eco-friendly interior gloss paint, beautiful glossy film, easy to clean, color durable over time.'
    },
    features: {
      vi: ['Màng sơn bóng', 'Dễ lau chùi', 'Bền màu'],
      en: ['Glossy film', 'Easy to clean', 'Durable color']
    },
    image: 'https://i.imgur.com/U1NmVRm.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '3,150,000'
  },
  {
    id: 'G8.5',
    name: 'Sơn nội thất siêu bóng cao cấp G8.5',
    category: 'topcoat',
    description: {
      vi: 'Loại sơn nội thất cao cấp với độ bóng loáng mịn màng, che phủ cao, lau chùi hiệu quả. Mang lại nét sang trọng hiện đại.',
      en: 'Premium interior paint with smooth glossy finish, high coverage, effective cleaning. Brings modern luxury.'
    },
    features: {
      vi: ['Siêu bóng', 'Lau chùi hiệu quả', 'Sang trọng'],
      en: ['Super gloss', 'Effective cleaning', 'Luxury']
    },
    image: 'https://i.imgur.com/njPU5PC.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '3,850,000'
  },
  // SƠN PHỦ NGOẠI THẤT
  {
    id: 'G8.7',
    name: 'Sơn siêu mịn ngoại thất cao cấp G8.7',
    category: 'topcoat',
    description: {
      vi: 'Sơn ngoại thất siêu mịn với tính năng ưu việt của ngành sơn trang trí, bảo vệ tối đa bề mặt tường ngoại thất.',
      en: 'Super flat exterior paint with superior decorative features, providing maximum protection for exterior walls.'
    },
    features: {
      vi: ['Màng sơn mịn', 'Chịu thời tiết', 'Bảo vệ tối đa'],
      en: ['Smooth film', 'Weather resistant', 'Maximum protection']
    },
    image: 'https://i.imgur.com/osPzWeM.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '2,410,000'
  },
  {
    id: 'G8.8',
    name: 'Sơn ngoại thất bóng cao cấp G8.8',
    category: 'topcoat',
    description: {
      vi: 'Sơn bóng ngoại thất cao cấp, bảo vệ công trình khỏi rêu mốc, chống thấm và lau chùi hiệu quả.',
      en: 'Premium exterior gloss paint, protects structures from mold and algae, waterproofing and effective cleaning.'
    },
    features: {
      vi: ['Màng sơn bóng', 'Chống rêu mốc', 'Chống thấm'],
      en: ['Glossy film', 'Anti-mold/algae', 'Waterproofing']
    },
    image: 'https://i.imgur.com/nC7pgPI.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: Sau 4 giờ',
      en: 'Surface dry: 45 mins, Next coat: After 4 hours'
    },
    price: '4,599,000'
  },
  {
    id: 'G8.9',
    name: 'Sơn ngoại thất siêu bóng cao cấp G8.9',
    category: 'topcoat',
    description: {
      vi: 'Loại sơn ngoại thất đặc biệt nhẹ mùi, chống bám bẩn tốt, chống thấm tuyệt hảo, chịu chùi rửa tối đa. Lựa chọn hoàn hảo cho công trình sang trọng.',
      en: 'Special exterior paint, low odor, good dirt resistance, excellent waterproofing, maximum washability. Perfect for luxury projects.'
    },
    features: {
      vi: ['Siêu bóng', 'Chống bám bẩn', 'Chống thấm tuyệt hảo'],
      en: ['Super gloss', 'Dirt resistant', 'Excellent waterproofing']
    },
    image: 'https://i.imgur.com/b6ekggI.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '5,685,000'
  },
  // SƠN TRẦN & ĐẶC BIỆT
  {
    id: 'G8.6',
    name: 'Sơn siêu trắng trần cao cấp G8.6',
    category: 'special',
    description: {
      vi: 'Sơn phủ nội thất chuyên dụng cho trần nhà, độ trắng sáng cao, ít văng sơn, bám dính tốt.',
      en: 'Interior finishing paint specialized for ceilings, high brightness, less splatter, dry adhesion.'
    },
    features: {
      vi: ['Siêu trắng', 'Ít văng sơn', 'Bám dính cao'],
      en: ['Ultra white', 'Less splatter', 'High adhesion']
    },
    image: 'https://i.imgur.com/8TUS3ct.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 30 phút, Lớp kế tiếp: Sau 4 giờ',
      en: 'Surface dry: 30 mins, Next coat: After 4 hours'
    },
    price: '2,375,000'
  },
  {
    id: 'G9.4',
    name: 'Sơn siêu trắng trần kháng muối G9.4',
    category: 'special',
    description: {
      vi: 'Sơn trần cao cấp với khả năng kháng muối, kháng kiềm vượt trội, phù hợp cho vùng ven biển hoặc môi trường ẩm độ cao.',
      en: 'Premium ceiling paint with superior salt and alkali resistance, suitable for coastal areas or high humidity environments.'
    },
    features: {
      vi: ['Kháng muối', 'Chống kiềm', 'Trắng sáng rạng rỡ'],
      en: ['Salt resistant', 'Alkali resistant', 'Radiant white']
    },
    image: 'https://i.imgur.com/mHQLrxX.jpeg',
    coverage: '12-13 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: Sau 4 giờ',
      en: 'Surface dry: 45 mins, Next coat: After 4 hours'
    },
    price: '2,950,000'
  },
  {
    id: 'G9.8',
    name: 'Sơn nhũ vàng G9.8',
    category: 'special',
    description: {
      vi: 'Sơn nhũ hệ nước với độ bóng siêu cao, hiệu ứng ánh kim lấp lánh. Chuyên dụng cho các kiến trúc tôn giáo, đền chùa, khách sạn.',
      en: 'Water-based metallic paint with super high gloss, sparkling metallic effect. Specialized for religious architecture, temples, hotels.'
    },
    features: {
      vi: ['Hiệu ứng ánh kim', 'Độ bóng siêu cao', 'Bền màu'],
      en: ['Metallic effect', 'Super high gloss', 'Durable color']
    },
    image: 'https://i.imgur.com/VPDV4iW.jpeg',
    coverage: '5-6 m²/kg/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 30 phút, Lớp kế tiếp: Sau 2-3 giờ',
      en: 'Surface dry: 30 mins, Next coat: After 2-3 hours'
    },
    price: '950,000'
  },
  {
    id: 'G5.8',
    name: 'Sơn chống nóng mái tôn G5.8',
    category: 'special',
    description: {
      vi: 'Sơn hệ nước có khả năng giảm nhiệt bề mặt từ 8-25 độ C nhờ mức độ bức xạ nhiệt cao. Giúp tiết kiệm điện năng làm mát.',
      en: 'Water-based paint capable of reducing surface temperature by 8-25°C due to high heat radiation. Helps save cooling energy.'
    },
    features: {
      vi: ['Giảm nhiệt 8-25°C', 'Chống rêu mốc', 'Tiết kiệm năng lượng'],
      en: ['8-25°C heat reduction', 'Anti-mold/algae', 'Energy saving']
    },
    image: 'https://i.imgur.com/feOm5Xz.jpeg',
    coverage: '6-8 m²/kg/lớp',
    dryingTime: {
      vi: 'Bề mặt: 1 giờ, Lớp kế tiếp: 3 giờ',
      en: 'Surface: 1 hour, Next coat: 3 hours'
    },
    price: '3,250,000'
  },
  {
    id: 'G6.8',
    name: 'Sơn lót chống gỉ sét mái tôn G6.8',
    category: 'industrial',
    description: {
      vi: 'Sơn chống gỉ hệ nước một thành phần, bảo vệ tức thời và lâu dài cho sắt thép, mái tôn với tuổi thọ trên 5 năm.',
      en: 'One-component water-based anti-rust paint, provides immediate and long-term protection for steel and metal roofs with 5+ year lifespan.'
    },
    features: {
      vi: ['Chống gỉ lâu dài', 'Không bắt lửa', 'Gốc nước an toàn'],
      en: ['Long-term anti-rust', 'Non-flammable', 'Safe water-based']
    },
    image: 'https://i.imgur.com/fevGmPo.jpeg',
    coverage: '5-6 m²/kg/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 2-4 giờ, Lớp kế tiếp: 3-4 giờ',
      en: 'Surface dry: 2-4 hours, Next coat: 3-4 hours'
    },
    price: '1,250,000'
  },
  {
    id: 'G9.7',
    name: 'Sơn giả đá G9.7',
    category: 'special',
    description: {
      vi: 'Giải pháp thay thế sơn truyền thống và ốp đá tự nhiên. Với hạt đá tự nhiên nghiền nhỏ, tạo bề mặt giống hệt đá ốp, bền đẹp.',
      en: 'Alternative to traditional paint and natural stone cladding. With finely ground natural stone particles, creates a surface identical to stone.'
    },
    features: {
      vi: ['Giống đá tự nhiên', 'Đa dạng màu sắc', 'Chịu va đập'],
      en: ['Natural stone look', 'Diverse colors', 'Impact resistant']
    },
    image: 'https://i.imgur.com/P70xXHg.jpeg',
    coverage: '0.5-3.5 kg/m²',
    dryingTime: {
      vi: 'Lớp kế tiếp: 2-4 giờ, Khô hoàn toàn: 6-24 giờ',
      en: 'Next coat: 2-4 hours, Full dry: 6-24 hours'
    },
    price: '1,850,000'
  },
  {
    id: 'G6.9',
    name: 'Sơn lót nền giả đá G6.9',
    category: 'primer',
    description: {
      vi: 'Sơn lót kháng kiềm đặc biệt được nghiên cứu để phù hợp với thi công sơn giả đá. Tăng độ bám dính và chống nấm mốc.',
      en: 'Special alkali-resistant primer researched to suit stone paint application. Increases adhesion and anti-mold properties.'
    },
    features: {
      vi: ['Kháng kiềm mạnh', 'Chống nấm mốc', 'Bám dính tuyệt vời'],
      en: ['Strong alkali resistance', 'Anti-mold', 'Excellent adhesion']
    },
    image: 'https://i.imgur.com/yKAqnLk.jpeg',
    coverage: '7-8 m²/kg/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '1,350,000'
  },
  // EPOXY & CÔNG NGHIỆP
  {
    id: 'G2000',
    name: 'Sơn Epoxy G2000',
    category: 'epoxy',
    description: {
      vi: 'Hệ sơn Epoxy phủ gốc nước 2 thành phần. Thân thiện môi trường, bám dính tốt trên nhiều bề mặt, chống cháy và mài mòn.',
      en: 'Two-component water-based Epoxy coating system. Eco-friendly, good adhesion on many surfaces, fire and abrasion resistant.'
    },
    features: {
      vi: ['Chống mài mòn', 'Kháng hóa chất', 'Thân thiện môi trường'],
      en: ['Abrasion resistant', 'Chemical resistant', 'Eco-friendly']
    },
    image: 'https://i.imgur.com/jRbwdnJ.jpeg',
    coverage: '6-8 m²/kg/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Surface dry: 4 hours, Full dry: 24 hours'
    },
    price: '4,500,000'
  },
  {
    id: 'G1000',
    name: 'Sơn lót Epoxy 2 thành phần gốc nước G1000',
    category: 'epoxy',
    description: {
      vi: 'Sơn lót Epoxy thẩm thấu sâu, tạo lớp màng bám dính vững chắc cho lớp sơn phủ. Phù hợp cho sàn bê tông, xi măng.',
      en: 'Deep penetrating Epoxy primer, creates a strong adhesive film for topcoats. Suitable for concrete and cement floors.'
    },
    features: {
      vi: ['Thẩm thấu sâu', 'Bám dính cực mạnh', 'Gốc nước'],
      en: ['Deep penetrating', 'Ultra-strong adhesion', 'Water-based']
    },
    image: 'https://i.imgur.com/wZoeH0k.jpeg',
    coverage: '8-10 m²/kg/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Surface dry: 4 hours, Full dry: 24 hours'
    },
    price: '1,850,000'
  },
  {
    id: 'G9.9',
    name: 'Sơn phủ bóng Clear G9.9',
    category: 'topcoat',
    description: {
      vi: 'Sơn phủ đặc biệt nhẹ mùi, siêu bóng, chống bám bẩn và chống thấm tuyệt hảo. Tôn vinh vẻ đẹp cho mọi công trình.',
      en: 'Special low-odor coating, super glossy, excellent dirt and water resistance. Enhances beauty for all projects.'
    },
    features: {
      vi: ['Siêu bóng Clear', 'Chống bám bẩn', 'Nhẹ mùi'],
      en: ['Super clear gloss', 'Dirt resistant', 'Low odor']
    },
    image: 'https://i.imgur.com/aTJYgN1.jpeg',
    coverage: '12-14 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 45 phút, Lớp kế tiếp: 3 giờ',
      en: 'Surface dry: 45 mins, Next coat: 3 hours'
    },
    price: '2,850,000'
  },
  {
    id: 'G.3',
    name: 'Sơn lót Epoxy G.3',
    category: 'epoxy',
    description: {
      vi: 'Sơn lót Epoxy khô nhanh, ngăn ngừa hóa chất và nước. Bám dính rất tốt giữa bê tông và các lớp sơn kế tiếp.',
      en: 'Fast-drying Epoxy primer, prevents chemicals and water. Excellent adhesion between concrete and subsequent layers.'
    },
    features: {
      vi: ['Khô nhanh', 'Kháng hóa chất', 'Kết nối tốt'],
      en: ['Fast drying', 'Chemical resistant', 'Good bonding']
    },
    image: 'https://i.imgur.com/2nwzCCe.jpeg',
    coverage: '7-11 m²/kg/lớp',
    dryingTime: {
      vi: 'Lớp kế tiếp: 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Next coat: 4 hours, Full dry: 24 hours'
    },
    price: '1,250,000'
  },
  {
    id: 'G.4',
    name: 'Sơn lót Epoxy cao cấp G.4',
    category: 'epoxy',
    description: {
      vi: 'Sơn lót đa năng gốc dầu 2 thành phần. Gia cường cho bề mặt bê tông yếu, xốp. Tăng độ uốn cơ học cho bề mặt.',
      en: 'Two-component oil-based multipurpose primer. Reinforces weak, porous concrete surfaces. Increases mechanical flexibility.'
    },
    features: {
      vi: ['Đa năng', 'Gia cường mặt sàn', 'Gốc dầu'],
      en: ['Multipurpose', 'Surface reinforcement', 'Oil-based']
    },
    image: 'https://i.imgur.com/fLfQUve.jpeg',
    coverage: '0.11-0.17 kg/m²',
    dryingTime: {
      vi: 'Lớp kế tiếp: 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Next coat: 4 hours, Full dry: 24 hours'
    },
    price: '1,650,000'
  },
  {
    id: 'G.5',
    name: 'Sơn Epoxy hệ lăn G.5',
    category: 'epoxy',
    description: {
      vi: 'Sơn Epoxy cao cấp hệ lăn, chịu mài mòn, kháng hóa chất, dễ lau chùi. Tiết kiệm chi phí và thi công nhanh.',
      en: 'Premium roller-applied Epoxy paint, abrasion and chemical resistant, easy to clean. Cost-saving and fast application.'
    },
    features: {
      vi: ['Chịu mài mòn', 'Tiết kiệm chi phí', 'Đa dạng màu sắc'],
      en: ['Abrasion resistant', 'Cost saving', 'Diverse colors']
    },
    image: 'https://i.imgur.com/PWuyUqu.jpeg',
    coverage: '5-6 m²/kg/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: Sau 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Surface dry: After 4 hours, Full dry: 24 hours'
    },
    price: '2,150,000'
  },
  {
    id: 'G.6',
    name: 'Sơn Epoxy hệ tự san G.6',
    category: 'epoxy',
    description: {
      vi: 'Loại sơn Epoxy tự san phẳng with khả năng chống mài mòn và va đập vượt trội. Tạo lớp phủ chịu lực cực tốt.',
      en: 'Self-leveling Epoxy paint with outstanding abrasion and impact resistance. Creates extremely good load-bearing coating.'
    },
    features: {
      vi: ['Tự san phẳng', 'Chống va đập', 'Màng sơn dai'],
      en: ['Self-leveling', 'Impact resistant', 'Tough film']
    },
    image: 'https://i.imgur.com/MgFR4Jq.jpeg',
    coverage: '1 m²/0.5-1.3kg',
    dryingTime: {
      vi: 'Khô bề mặt: Sau 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Surface dry: After 4 hours, Full dry: 24 hours'
    },
    price: '3,850,000'
  },
  {
    id: 'G.7',
    name: 'Sơn Epoxy Sport G.7',
    category: 'epoxy',
    description: {
      vi: 'Sơn Epoxy hệ tự san chuyên dụng ngoài trời. Chịu nước và thời tiết vượt trội, thích hợp cho sân thể thao, khán đài.',
      en: 'Specialized outdoor self-leveling Epoxy paint. Outstanding water and weather resistance, suitable for sports courts, stands.'
    },
    features: {
      vi: ['Chịu thời tiết', 'Chuyên dụng thể thao', 'Bền màu'],
      en: ['Weather resistant', 'Sports specialized', 'Durable color']
    },
    image: 'https://i.imgur.com/dUoumvG.jpeg',
    coverage: '1 m²/0.5-1.3kg',
    dryingTime: {
      vi: 'Khô bề mặt: Sau 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Surface dry: After 4 hours, Full dry: 24 hours'
    },
    price: '4,250,000'
  },
  {
    id: 'G.8',
    name: 'Sơn Epoxy kẻ vạch G.8',
    category: 'traffic',
    description: {
      vi: 'Sơn kẻ vạch lạnh gốc nhựa Acrylic. Kháng nước, kháng kiềm, chịu mài mòn cao. Không cần máy đun nóng.',
      en: 'Cold-applied Epoxy traffic paint based on Acrylic resin. Water, alkali, and high abrasion resistant. No heater needed.'
    },
    features: {
      vi: ['Kẻ vạch lạnh', 'Chịu mài mòn', 'Kháng kiềm'],
      en: ['Cold marking', 'Abrasion resistant', 'Alkali resistant']
    },
    image: 'https://i.imgur.com/0PME5c1.jpeg',
    coverage: '5-6 m²/kg/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: Sau 15 phút, Lớp kế tiếp: Sau 1 giờ',
      en: 'Surface dry: After 15 mins, Next coat: After 1 hour'
    },
    price: '2,450,000'
  },
  {
    id: 'G.9',
    name: 'Sơn Epoxy phủ đệm G.9',
    category: 'epoxy',
    description: {
      vi: 'Lớp sơn đệm 2 thành phần giữa lớp lót và lớp phủ. Tăng sự kết dính, màng sơn dẻo, độ phủ tốt.',
      en: 'Two-component cushion layer between primer and topcoat. Increases adhesion, flexible film, good coverage.'
    },
    features: {
      vi: ['Tăng kết dính', 'Màng sơn dẻo', 'Chịu tải trọng tốt'],
      en: ['Increases adhesion', 'Flexible film', 'Good load bearing']
    },
    image: 'https://i.imgur.com/eXhYInq.jpeg',
    coverage: '1kg/0.3-0.8m²',
    dryingTime: {
      vi: 'Khô bề mặt: 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Surface dry: 4 hours, Full dry: 24 hours'
    },
    price: '1,450,000'
  },
  {
    id: 'G.10',
    name: 'Sơn chống tĩnh điện G.10',
    category: 'epoxy',
    description: {
      vi: 'Sơn Epoxy 2 thành phần kiểm soát tĩnh điện theo tiêu chuẩn ESD. Chống mài mòn và chịu tải tốt.',
      en: 'Two-component Epoxy paint for static control according to ESD standards. Abrasion resistant and good load bearing.'
    },
    features: {
      vi: ['Chống tĩnh điện', 'Tiêu chuẩn ESD', 'Chống mài mòn'],
      en: ['Antistatic', 'ESD standard', 'Abrasion resistant']
    },
    image: 'https://i.imgur.com/mHvsLfv.jpeg',
    coverage: '0.5-1.3 kg/m²',
    dryingTime: {
      vi: 'Khô bề mặt: <4H, Khô hoàn toàn: <24H',
      en: 'Surface dry: <4H, Full dry: <24H'
    },
    price: '3,250,000'
  },
  {
    id: 'G.11',
    name: 'Sơn lót kẻ vạch G.11',
    category: 'traffic',
    description: {
      vi: 'Sơn lót khô nhanh, bám dính tốt, thẩm thấu sâu. Gắn kết tốt với sơn kẻ vạch đường nóng chảy.',
      en: 'Fast-drying primer, good adhesion, deep penetrating. Bonds well with thermoplastic road marking paints.'
    },
    features: {
      vi: ['Thẩm thấu sâu', 'Khô cực nhanh', 'Bám dính 100%'],
      en: ['Deep penetrating', 'Ultra fast drying', '100% adhesion']
    },
    image: 'https://i.imgur.com/LWrKS19.jpeg',
    coverage: '10-12 m²/kg/lớp',
    dryingTime: {
      vi: 'Thời gian khô: ≤ 15 phút',
      en: 'Drying time: ≤ 15 mins'
    },
    price: '1,150,000'
  },
  {
    id: 'G.12',
    name: 'Sơn nhiệt dẻo phản quang G.12',
    category: 'traffic',
    description: {
      vi: 'Sơn chuyên dụng kẻ vạch giao thông, bền nhiệt, ổn định, dễ nhận biết trong thời tiết xấu.',
      en: 'Specialized traffic marking paint, heat resistant, stable, easily recognizable in bad weather.'
    },
    features: {
      vi: ['Phản quang', 'Bền nhiệt >70%', 'Khô nhanh <2 phút'],
      en: ['Reflective', 'Heat resistant >70%', 'Fast drying <2 mins']
    },
    image: 'https://i.imgur.com/AM3yNEh.jpeg',
    coverage: '3-3.5 kg/m²',
    dryingTime: {
      vi: 'Thời gian khô: ≤ 2 phút',
      en: 'Drying time: ≤ 2 mins'
    },
    price: '550,000'
  },
  {
    id: 'G.13',
    name: 'Sơn lót sân thể thao G.13',
    category: 'special',
    description: {
      vi: 'Sơn lót đệm chuyên dụng bao gồm nhựa PU và ACRYLIC. Chống thấm, tạo lớp đệm mềm, giảm chấn động.',
      en: 'Specialized cushion primer including PU and ACRYLIC resins. Waterproof, creates soft cushion, reduces impact.'
    },
    features: {
      vi: ['Giảm chấn động', 'Gốc PU/Acrylic', 'Chống thấm'],
      en: ['Shock absorption', 'PU/Acrylic based', 'Waterproof']
    },
    image: 'https://i.imgur.com/AYCka4x.jpeg',
    coverage: '0.3-0.4 kg/m²/lớp',
    dryingTime: {
      vi: 'Lớp kế tiếp: 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Next coat: 4 hours, Full dry: 24 hours'
    },
    price: '1,450,000'
  },
  {
    id: 'G.14',
    name: 'Sơn sân thể thao G.14',
    category: 'special',
    description: {
      vi: 'Lớp phủ đa năng chịu hóa chất, kiềm, axit, tia UV. Dẻo dai, độ đàn hồi cao, chịu va đập cơ học.',
      en: 'Multipurpose coating resistant to chemicals, alkali, acid, UV. Flexible, high elasticity, mechanical impact resistant.'
    },
    features: {
      vi: ['Chịu tia UV', 'Đàn hồi cao', 'Kháng hóa chất'],
      en: ['UV resistant', 'High elasticity', 'Chemical resistant']
    },
    image: 'https://i.imgur.com/GhPTKIi.jpeg',
    coverage: '4.5-5.0 m²/kg (2 lớp)',
    dryingTime: {
      vi: 'Lớp kế tiếp: 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Next coat: 4 hours, Full dry: 24 hours'
    },
    price: '1,850,000'
  },
  {
    id: 'G.15',
    name: 'Bitum chống thấm G.15',
    category: 'waterproof',
    description: {
      vi: 'Chất phủ chống thấm đàn hồi bitum biến tính polyme. Dễ dàng thi công bề mặt ngang/đứng, màng liền mạch.',
      en: 'Polymer-modified bitumen flexible waterproofing coating. Easy application on horizontal/vertical surfaces, seamless film.'
    },
    features: {
      vi: ['Gốc Bitum', 'Màng liền mạch', 'Độ đàn hồi cao'],
      en: ['Bitumen based', 'Seamless film', 'High elasticity']
    },
    image: 'https://i.imgur.com/aTnBKuD.jpeg',
    coverage: '0.2-1.4 kg/m²',
    dryingTime: {
      vi: 'Lớp kế tiếp: 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Next coat: 4 hours, Full dry: 24 hours'
    },
    price: '2,250,000'
  },
  {
    id: 'G.16',
    name: 'Sơn chống thấm sàn thể thao G.16',
    category: 'special',
    description: {
      vi: 'Sơn có tính dẻo và độ bền cao, thích hợp cho sân tennis, pickleball. Chịu được tia UV và va đập cơ học.',
      en: 'High flexibility and durability paint, suitable for tennis courts, pickleball. UV and mechanical impact resistant.'
    },
    features: {
      vi: ['Dẻo dai', 'Bền màu tia UV', 'Chống va đập'],
      en: ['Flexible', 'UV color fastness', 'Impact resistant']
    },
    image: 'https://i.imgur.com/JRxSqYm.jpeg',
    coverage: '5-6 m²/kg/lớp',
    dryingTime: {
      vi: 'Lớp kế tiếp: 4 giờ, Khô hoàn toàn: 24 giờ',
      en: 'Next coat: 4 hours, Full dry: 24 hours'
    },
    price: '2,150,000'
  },
  {
    id: 'G.17',
    name: 'Sơn kẻ vạch thể thao G.17',
    category: 'traffic',
    description: {
      vi: 'Sơn chuyên dụng kẻ vạch chỉ dẫn cho sân thể thao, bãi đỗ xe, nhà xưởng. Độ bám dính tuyệt vời.',
      en: 'Specialized marking paint for sports courts, parking lots, factories. Excellent adhesion.'
    },
    features: {
      vi: ['Bám dính tuyệt vời', 'Sắc nét', 'Chịu mài mòn'],
      en: ['Excellent adhesion', 'Sharp lines', 'Abrasion resistant']
    },
    image: 'https://i.imgur.com/Is2VTbE.jpeg',
    coverage: '8-10 m²/kg/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 30 phút, Khô hoàn toàn: 12 giờ',
      en: 'Surface dry: 30 mins, Full dry: 12 hours'
    },
    price: '1,350,000'
  },
  {
    id: 'G.18',
    name: 'Sơn lót sắt G.18',
    category: 'industrial',
    description: {
      vi: 'Màng sơn cứng, bảo vệ sắt thép khỏi gỉ sét và tác động thời tiết. Tiết kiệm và dễ thi công.',
      en: 'Hard paint film, protects iron and steel from rust and weather impacts. Economical and easy to apply.'
    },
    features: {
      vi: ['Chống gỉ sét', 'Màng sơn cứng', 'Tiết kiệm'],
      en: ['Rust proof', 'Hard film', 'Economical']
    },
    image: 'https://i.imgur.com/ZYhmJsi.jpeg',
    coverage: '8-12 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 2-4 giờ, Khô hoàn toàn: 16 giờ',
      en: 'Surface dry: 2-4 hours, Full dry: 16 hours'
    },
    price: '1,450,000'
  },
  {
    id: 'G.19',
    name: 'Sơn sắt G.19',
    category: 'industrial',
    description: {
      vi: 'Sơn dầu Alkyd bảo vệ và trang trí thiết bị sắt, thép, gỗ. Màu sắc tươi đẹp, bền màu.',
      en: 'Alkyd oil paint for protecting and decorating iron, steel, wood equipment. Beautiful and durable colors.'
    },
    features: {
      vi: ['Bền màu', 'Trang trí thép/gỗ', 'Dễ sử dụng'],
      en: ['Color durable', 'Steel/wood decoration', 'Easy to use']
    },
    image: 'https://i.imgur.com/WR1MGeI.jpeg',
    coverage: '8-12 m²/lít/lớp',
    dryingTime: {
      vi: 'Khô bề mặt: 2-4 giờ, Khô hoàn toàn: 16 giờ',
      en: 'Surface dry: 2-4 hours, Full dry: 16 hours'
    },
    price: '1,850,000'
  }
];

export const PARTNERS = [
  { name: 'Thang Long Real', origin: { vi: 'Hợp tác chiến lược', en: 'Strategic Partner' }, logo: 'https://i.imgur.com/wWBJMgc.jpeg' },
  { name: 'BT Bảo Toàn', origin: { vi: 'Hợp tác chiến lược', en: 'Strategic Partner' }, logo: 'https://i.imgur.com/wWBJMgc.jpeg' },
  { name: 'DIC', origin: { vi: 'Đối tác dự án', en: 'Project Partner' }, logo: 'https://i.imgur.com/wWBJMgc.jpeg' },
  { name: 'Geleximco', origin: { vi: 'Đối tác chiến lược', en: 'Strategic Partner' }, logo: 'https://i.imgur.com/wWBJMgc.jpeg' },
  { name: 'Hòa Phát', origin: { vi: 'Đối tác dự án', en: 'Project Partner' }, logo: 'https://i.imgur.com/wWBJMgc.jpeg' },
  { name: 'Ecopark', origin: { vi: 'Đối tác dự án', en: 'Project Partner' }, logo: 'https://i.imgur.com/wWBJMgc.jpeg' }
];

export interface Project {
  id: string;
  name: string;
  type: { vi: string; en: string };
  image: string;
}

export const PROJECTS: Project[] = [
  { id: 'p1', name: 'Geleximco Hải Phòng', type: { vi: 'Dự án trọng điểm', en: 'Key Project' }, image: 'https://i.imgur.com/hQezqZK.jpeg' },
  { id: 'p2', name: 'Elite Park', type: { vi: 'Chung cư cao cấp', en: 'Luxury Apartment' }, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' },
  { id: 'p3', name: 'Chung cư Dic Phoenix', type: { vi: 'Căn hộ tiêu chuẩn', en: 'Standard Apartment' }, image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=2070&auto=format&fit=crop' },
  { id: 'p4', name: 'Hoa Tiên Paradise', type: { vi: 'Khu nghỉ dưỡng', en: 'Resort' }, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop' },
  { id: 'p5', name: 'KDC Nghĩa Trung', type: { vi: 'Nhà ở xã hội', en: 'Social Housing' }, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop' },
  { id: 'p6', name: 'Dự án Fiato Premier', type: { vi: 'Căn hộ cao cấp', en: 'High-end Apartment' }, image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop' }
];

export const FEATURES_7 = {
  vi: [
    'Bền màu với thời gian & thời tiết khắc nghiệt',
    'Hoàn toàn không chứa chất độc hại',
    'Độ bám dính tuyệt hảo',
    'Độ che phủ cao, dễ thi công',
    'Chống thấm, chống kiềm',
    'Không loang màu',
    'Chống rong rêu nấm mốc'
  ],
  en: [
    'Durable color over time & harsh weather',
    'Completely free of toxic substances',
    'Excellent adhesion',
    'High coverage, easy to apply',
    'Waterproof, alkali resistant',
    'No color bleeding',
    'Anti-mold and algae'
  ]
};

export const CRITERIA_9 = {
  vi: [
    { id: 'G1', label: 'Bảo hành', detail: 'Cam kết chất lượng' },
    { id: 'G2', label: 'Hài lòng', detail: 'Trải nghiệm khách hàng' },
    { id: 'G3', label: 'Bộ sưu tập', detail: 'Đa dạng phong cách' },
    { id: 'G4', label: 'Chính hãng', detail: 'Nguồn gốc rõ ràng' },
    { id: 'G5', label: 'Sống Xanh', detail: 'Thân thiện môi trường' },
    { id: 'G6', label: 'Toàn cầu', detail: 'Tiêu chuẩn quốc tế' },
    { id: 'G7', label: 'Mục tiêu', detail: 'Vươn tầm thế giới' },
    { id: 'G8', label: 'Tuyệt vời', detail: 'Giá trị vượt trội' },
    { id: 'G9', label: 'Phát triển', detail: 'Bền vững tương lai' }
  ],
  en: [
    { id: 'G1', label: 'Guarantee', detail: 'Quality Commitment' },
    { id: 'G2', label: 'Satisfaction', detail: 'Customer Experience' },
    { id: 'G3', label: 'Gallery', detail: 'Diverse Styles' },
    { id: 'G4', label: 'Genuine', detail: 'Clear Origin' },
    { id: 'G5', label: 'Green', detail: 'Eco-friendly' },
    { id: 'G6', label: 'Global', detail: 'International Standard' },
    { id: 'G7', label: 'Goal', detail: 'Global Reach' },
    { id: 'G8', label: 'Great', detail: 'Superior Value' },
    { id: 'G9', label: 'Growth', detail: 'Sustainable Future' }
  ]
};

export const TRANSLATIONS = {
  vi: {
    heroSub: 'Công nghệ 4.0 từ CTCP Quốc tế AIG',
    heroTitle: 'VÌ CUỘC SỐNG XANH',
    heroDesc: 'Tiên phong ứng dụng công nghệ 4.0 vào sản xuất & vận hành, mang đến giải pháp sơn "xanh" an toàn tuyệt đối cho sức khỏe cộng đồng.',
    btnCollab: 'Hợp tác đại lý',
    btnExplore: 'Khám phá sản phẩm',
    visionSub: 'Tầm nhìn & Sứ mệnh',
    visionTitle: 'Hệ Sinh Thái 9 Tiêu Chí Vàng',
    visionDesc: 'G9ECO hoạt động dựa trên 9 tiêu chí cốt lõi, đảm bảo mang lại giá trị bền vững và trải nghiệm tốt nhất cho mọi công trình.',
    featureTitle: 'Tính Năng Đột Phá',
    ecoPredictor: 'Eco-Predictor AI',
    calcTitle: 'Tính Toán Dự Toán Vật Tư',
    calcDesc: 'Hệ thống dự toán AI giúp tối ưu hóa lượng sơn cần thiết, giảm thiểu lãng phí và đảm bảo độ bao phủ hoàn hảo cho công trình của bạn.',
    inputArea: 'Nhập diện tích bề mặt (m²)',
    resultTitle: 'Kết quả dự toán (Dự kiến)',
    resultPrimer: 'Sơn lót cần thiết',
    resultTopcoat: 'Sơn phủ cần thiết',
    productTitle: 'Siêu Phẩm Công Trình Xanh',
    productDesc: 'Danh mục sản phẩm đa dạng từ sơn lót, sơn phủ đến sơn chống thấm chuyên dụng.',
    partnerSub: 'Hợp tác bền vững',
    partnerTitle: 'Đối Tác Chiến Lược & Dự Án Tiêu Biểu',
    partnerDesc: 'Kết hợp tinh hoa từ các tập đoàn hóa chất hàng đầu thế giới (Dow, Eliokem, Nuplex...) cùng niềm tin từ các chủ đầu tư lớn trên toàn quốc.',
    projectTitle: 'Dự Án Trọng Điểm',
    projectCount: 'Công trình tiêu biểu',
    btnViewProfile: 'Xem hồ sơ',
    footerSub: 'A Member of AIG Group',
    footerSlogan: 'VÌ CUỘC SỐNG XANH',
    footerAddressHead: 'Trụ sở chính:',
    footerCentralHead: 'Chi nhánh Miền Trung:',
    footerSouthHead: 'Chi nhánh Miền Nam:',
    navHome: 'Trang chủ',
    navEco: 'Hệ sinh thái',
    navProduct: 'Sản phẩm',
    navCalculator: 'Dự toán AI',
    navProject: 'Dự án',
    navPartner: 'Đại lý',
    navDealer: 'Hợp tác Đại lý',
    navPrice: 'Bảng giá',
    headerFanDeck: 'Bảng Màu Điện Tử G9ECO',
    chooseColorGroup: 'Chọn nhóm màu phụ phí',
    chooseSpecificColor: 'Chọn màu từ quạt màu Portfolio Pro',
    calcStep1: '1. Diện tích',
    calcStep2: '2. Không gian',
    calcStep3: '3. Chất lượng',
    calcStep4: '4. Màu sắc',
    calcStep5: '5. Tổng hợp',
    surfaceInterior: 'Trong nhà',
    surfaceExterior: 'Ngoài trời',
    wallCondition: 'Tình trạng tường',
    wallNew: 'Xây mới (Bả + Lót + Phủ)',
    wallOld: 'Sơn lại (Lót + Phủ)',
    areaExplainTitle: 'Vì sao diện tích sơn lại lớn hơn diện tích sàn?',
    areaExplainDesc: 'Diện tích sơn thực tế bao gồm toàn bộ bề mặt 4 bức tường xung quanh và trần nhà. Đối với nhà phố tiêu chuẩn, hệ số quy đổi thường là 4.0 (VD: 100m² sàn x 4 = 400m² sơn).',
    tierEconomic: 'Tiết kiệm',
    tierPremium: 'Tiêu chuẩn',
    tierSuper: 'Cao cấp',
    houseTypeTube: 'Nhà ống / Nhiều phòng',
    houseTypeTown: 'Nhà phố tiêu chuẩn',
    houseTypeL4Ceil: 'Nhà cấp 4 (có trần)',
    houseTypeL4Simple: 'Nhà cấp 4 (không trần)',
    houseTypeVilla: 'Biệt thự / Tân cổ điển',
    includeLabor: 'Bao gồm nhân công',
    laborPrice: 'Phí thi công (VNĐ/m²)',
    chooseProduct: 'Chọn dòng sơn',
    chooseColor: 'Chọn nhóm màu',
    estTotal: 'Tổng dự toán hoàn thiện',
    estMaterial: 'Chi phí vật tư',
    estLabor: 'Chi phí nhân công',
    estVolume: 'Khối lượng sơn',
    estPrice: 'Thành tiền',
    estDetails: 'Danh mục vật tư chi tiết',
    estNote: 'Lưu ý: Kết quả mang tính chất tham khảo. Độ ẩm tường (<16%) và tay nghề thợ sẽ ảnh hưởng đến độ phủ thực tế.',
    coverage: 'Độ phủ',
    dryingTime: 'Thời gian khô',
    priceUnit: ' Giá lẻ niêm yết (VNĐ)',
    contact: 'Liên hệ',
    headerPrice: 'Bảng Giá Sản Phẩm',
    headerColorPrice: 'Bảng Giá Pha Màu',
    tableProduct: 'Sản Phẩm',
    tableUnit: 'Đơn vị',
    tablePrice: 'Đơn Giá',
    tableColorRange: 'Mã Màu / Nhóm Màu',
    tableInterior: 'Sơn Nội Thất',
    tableExterior: 'Sơn Ngoại Thất',
    adminTitle: 'Quản trị hệ thống',
    adminSub: 'Quản trị AI',
    adminProductTitle: 'Quản lý Sản phẩm',
    adminProductSub: 'Cập nhật hình ảnh, giá và thông tin kỹ thuật',
    adminCertificateTitle: 'Giấy chứng nhận',
    adminCertificateSub: 'Quản lý các hồ sơ năng lực và chứng thực chất lượng',
    adminDealerTitle: 'Hệ thống Đại lý',
    adminDealerSub: 'Quản lý mạng lưới phân phối 3 miền',
    adminProjectTitle: 'Quản lý Dự án',
    adminProjectSub: 'Cập nhật hình ảnh và thông tin dự án tiêu biểu',
    btnSave: 'Lưu',
    btnCancel: 'Hủy',
    btnDelete: 'Xóa',
    btnAddNew: 'Thêm mới',
    btnImportSample: 'Nhập dữ liệu mẫu',
    confirmDelete: 'Bạn có chắc chắn muốn xóa?',
    confirmImport: 'Bạn có muốn nhập dữ liệu mẫu không?',
    uploadError: 'Lỗi khi tải ảnh lên. Vui lòng thử lại.',
    placeholderSearch: 'Tìm kiếm...',
    placeholderUrl: 'Nhập URL hình ảnh...',
    regionNorth: 'Miền Bắc',
    regionCentral: 'Miền Trung',
    regionSouth: 'Miền Nam',
    labelPrice: 'Giá (VNĐ)',
    labelCoverage: 'Độ phủ (m²/lít)',
    labelDrying: 'Sấy khô',
    labelAddress: 'Địa chỉ',
    labelPhone: 'Số điện thoại',
    labelName: 'Họ tên / Tên đơn vị',
    all: 'Tất cả',
    projectType: 'Hạng mục dự án',
    standardsTitle: 'Tiêu chuẩn & Chất lượng',
    certificates: 'Giấy chứng nhận',
    networkTitle: 'Mạng lưới phân phối',
    networkHeading: 'Hệ thống đại lý 3 miền',
    networkDesc: 'G9ECO tự hào đồng hành cùng đối tác trên khắp mọi miền tổ quốc, mang sản phẩm xanh chất lượng đến mọi công trình.',
    btnApplyRegion: 'Đăng ký đại lý khu vực',
    updatingList: 'Đang cập nhật danh sách...',
    footerBrand: 'CTCP Quốc tế AIG - Thương hiệu Sơn G9ECO',
    footerVision: 'Vì Cuộc Sống Xanh',
    footerCredit: 'Sơn G9ECO - AIG Group',
    copyright: '© 2026 G9ECO - A FUTURE VISION BY AIG GROUP',
    pdfTitle: 'BÁO GIÁ VẬT TƯ G9ECO',
    pdfSub: 'Thành viên AIG Group - Giải pháp sơn xanh bền vững',
    pdfDate: 'Ngày báo giá',
    pdfInfo: 'Thông tin công trình',
    pdfItem: 'Hạng mục',
    pdfSurface: 'Vị trí',
    pdfArea: 'Diện tích sàn',
    pdfRealArea: 'Tổng diện tích sơn',
    pdfQuality: 'Chất lượng',
    pdfTotalDesc: 'Tổng giá trị dự toán',
    pdfNote: 'Giá niêm yết chưa chiết khấu',
    pdfTableProduct: 'Sản phẩm',
    pdfTableQty: 'Khối lượng',
    pdfTableUnit: 'Đơn vị',
    pdfTablePrice: 'Thành tiền (VNĐ)',
    pdfLabor: 'Chi phí thi công trọn gói',
    pdfTotal: 'Tổng cộng',
    pdfTechNote: 'Lưu ý kỹ thuật:',
    pdfTech1: 'Độ ẩm tường trước khi sơn phải < 16% (đo bằng máy đo độ ẩm Protimeter).',
    pdfTech2: 'Bề mặt phải sạch, khô, không dính dầu mỡ hay bụi bẩn.',
    pdfTech3: 'Số lớp sơn đề nghị: 02 lớp bả - 01 lớp lót - 02 lớp phủ màu.',
    pdfContact: 'Liên hệ tư vấn:',
    pdfFooter: 'Sơn G9ECO - Công nghệ 4.0 vì một tương lai xanh.',
    stepArea: 'Diện tích',
    stepSpace: 'Không gian',
    stepQuality: 'Chất lượng',
    stepColor: 'Màu sắc',
    stepSummary: 'Tổng hợp',
    uploadPhoto: 'Tải ảnh công trình',
    uploadPhotoDesc: 'Tải ảnh hiện trạng để AI phân tích bề mặt',
    unitLiter: 'Lít',
    unitKg: 'Kg',
    unitSystem: 'Hệ'
  },
  en: {
    heroSub: 'Industry 4.0 Tech from AIG International Corp',
    heroTitle: 'Digital Green Paint',
    heroDesc: 'A brand of AIG International Corp. Pioneering the application of 4.0 technology in production & operation, providing "green" paint solutions that are absolutely safe for public health.',
    btnCollab: 'Dealer Partnership',
    btnExplore: 'Explore Products',
    visionSub: 'Vision & Mission',
    visionTitle: '9 Golden Criteria Ecosystem',
    visionDesc: 'G9ECO operates based on 9 core criteria, ensuring sustainable value and the best experience for every project.',
    featureTitle: 'Breakthrough Features',
    ecoPredictor: 'Eco-Predictor AI',
    calcTitle: 'Material Estimation Calculation',
    calcDesc: 'The AI estimation system helps optimize the amount of paint needed, minimize waste and ensure perfect coverage for your project.',
    inputArea: 'Enter surface area (m²)',
    resultTitle: 'Estimation Results (Estimated)',
    resultPrimer: 'Required Primer',
    resultTopcoat: 'Required Topcoat',
    productTitle: 'Green Construction Masterpieces',
    productDesc: 'Diverse product portfolio from primers, topcoats to specialized waterproof paints.',
    partnerSub: 'Sustainable Cooperation',
    partnerTitle: 'Strategic Partners & Typical Projects',
    partnerDesc: 'Combining elites from leading chemical corporations (Dow, Eliokem, Nuplex...) and trust from major investors nationwide.',
    projectTitle: 'Key Projects',
    projectCount: 'Typical projects',
    btnViewProfile: 'View profile',
    footerSub: 'A Member of AIG Group',
    footerAddressHead: 'Headquarters:',
    footerCentralHead: 'Central Branch:',
    footerSouthHead: 'Southern Branch:',
    navHome: 'Home',
    navEco: 'Ecosystem',
    navProduct: 'Products',
    navCalculator: 'AI Estimator',
    navProject: 'Projects',
    navPartner: 'Dealers',
    navDealer: 'Partner with Us',
    navPrice: 'Pricing',
    headerFanDeck: 'G9ECO Digital Color Chart',
    chooseColorGroup: 'Select Color Price Group',
    chooseSpecificColor: 'Select Color from Portfolio Pro Fan Deck',
    calcStep1: '1. Area',
    calcStep2: '2. Space',
    calcStep3: '3. Quality',
    calcStep4: '4. Color',
    calcStep5: '5. Summary',
    surfaceInterior: 'Interior',
    surfaceExterior: 'Exterior',
    wallCondition: 'Wall Condition',
    wallNew: 'New Build (Putty + Primer + Topcoat)',
    wallOld: 'Repaint (Primer + Topcoat)',
    areaExplainTitle: 'Why is paint area larger than floor area?',
    areaExplainDesc: 'The actual paint area includes all 4 surrounding walls and the ceiling. For standard townhouses, the conversion factor is typically 4.0 (e.g., 100sqm floor x 4 = 400sqm paint).',
    tierEconomic: 'Economic',
    tierPremium: 'Standard',
    tierSuper: 'Premium',
    houseTypeTube: 'Tube House / Many Rooms',
    houseTypeTown: 'Standard Townhouse',
    houseTypeL4Ceil: 'Level 4 (With Ceiling)',
    houseTypeL4Simple: 'Level 4 (No Ceiling)',
    houseTypeVilla: 'Villa / Neoclassical',
    includeLabor: 'Include Labor Cost',
    laborPrice: 'Labor Cost (VND/m²)',
    chooseProduct: 'Select Paint Line',
    chooseColor: 'Select Color Group',
    estTotal: 'Total Final Estimate',
    estMaterial: 'Material Cost',
    estLabor: 'Labor Cost',
    estVolume: 'Paint Volume',
    estPrice: 'Total Price',
    estDetails: 'Material Breakdowns',
    estNote: 'Note: Results are for reference only. Wall moisture (<16%) and painter skill affect actual coverage.',
    coverage: 'Coverage',
    dryingTime: 'Drying Time',
    priceUnit: 'MRP (VND)',
    contact: 'Contact',
    headerPrice: 'Official Price List',
    headerColorPrice: 'Color Mixing Prices',
    tableProduct: 'Product Name',
    tableUnit: 'Unit',
    tablePrice: 'Unit Price',
    tableColorRange: 'Color Range / Code',
    tableInterior: 'Interior Paint',
    tableExterior: 'Exterior Paint',
    adminTitle: 'System Admin',
    adminSub: 'AI Management',
    adminProductTitle: 'Product Management',
    adminProductSub: 'Update images, prices and technical data',
    adminCertificateTitle: 'Certificates',
    adminCertificateSub: 'Manage capability profiles and quality certifications',
    adminDealerTitle: 'Dealer System',
    adminDealerSub: 'Manage 3-region distribution network',
    adminProjectTitle: 'Project Management',
    adminProjectSub: 'Update featured project info and images',
    btnSave: 'Save',
    btnCancel: 'Cancel',
    btnDelete: 'Delete',
    btnAddNew: 'Add New',
    btnImportSample: 'Import Sample',
    confirmDelete: 'Are you sure you want to delete?',
    confirmImport: 'Do you want to import sample data?',
    uploadError: 'Image upload failed. Please try again.',
    placeholderSearch: 'Search...',
    placeholderUrl: 'Paste image URL...',
    regionNorth: 'North',
    regionCentral: 'Central',
    regionSouth: 'South',
    labelPrice: 'Price (VNĐ)',
    labelCoverage: 'Coverage (m²/l)',
    labelDrying: 'Drying',
    labelAddress: 'Address',
    labelPhone: 'Phone',
    labelName: 'Name / Organization',
    all: 'All',
    projectType: 'Project Category',
    standardsTitle: 'Standards & Quality',
    certificates: 'Certificates',
    networkTitle: 'Distribution Network',
    networkHeading: '3-Region Dealer Network',
    networkDesc: 'G9ECO is proud to accompany partners across the country, bringing quality green products to every project.',
    btnApplyRegion: 'Apply for this region',
    updatingList: 'Updating list...',
    footerBrand: 'AIG International Corp - G9ECO Paint Brand',
    footerVision: 'For A Green Life',
    footerCredit: 'G9ECO Paint - AIG Group',
    copyright: '© 2026 G9ECO - A FUTURE VISION BY AIG GROUP',
    pdfTitle: 'MATERIAL QUOTATION G9ECO',
    pdfSub: 'A Member of AIG Group - Sustainable Green Solutions',
    pdfDate: 'Quote Date',
    pdfInfo: 'Project Information',
    pdfItem: 'Category',
    pdfSurface: 'Location',
    pdfArea: 'Floor Area',
    pdfRealArea: 'Total Painted Area',
    pdfQuality: 'Quality',
    pdfTotalDesc: 'Total Estimated Value',
    pdfNote: 'List price before discount',
    pdfTableProduct: 'Product',
    pdfTableQty: 'Quantity',
    pdfTableUnit: 'Unit',
    pdfTablePrice: 'Subtotal (VNĐ)',
    pdfLabor: 'Full Package Labor Cost',
    pdfTotal: 'Total',
    pdfTechNote: 'Technical notes:',
    pdfTech1: 'Wall humidity before painting must be < 16% (measured with Protimeter humidity meter).',
    pdfTech2: 'Surface must be clean, dry, free from grease or dust.',
    pdfTech3: 'Recommended paint layers: 02 putty - 01 primer - 02 topcoat layers.',
    pdfContact: 'Contact for consultation:',
    pdfFooter: 'G9ECO Paint - 4.0 Technology for a green future.',
    stepArea: 'Area',
    stepSpace: 'Space',
    stepQuality: 'Quality',
    stepColor: 'Color',
    stepSummary: 'Summary',
    uploadPhoto: 'Project Photo',
    uploadPhotoDesc: 'Upload site photos for AI surface analysis',
    unitLiter: 'Liter',
    unitKg: 'Kg',
    unitSystem: 'System'
  }
};

export const NAV_LINKS = [
  { id: 'navHome', href: '#home' },
  { id: 'navEco', href: '#story' },
  { id: 'navProduct', href: '#products' },
  { id: 'navCalculator', href: '#support' },
  { id: 'navProject', href: '#projects' },
  { id: 'navPartner', href: '#partners' },
  { id: 'navDealer', href: '#dealer-partnership' }
];

export interface PriceListItem {
  id: string;
  name: { vi: string; en: string };
  unit: string;
  price: string;
  priceValue: number;
  coverageValue: number;
  type: string;
  surface: string;
  tier?: 'economic' | 'premium' | 'super';
}

export interface PriceListCategory {
  title: { vi: string; en: string };
  items: PriceListItem[];
}

export const CALC_CONSTANTS = {
  K_INTERIOR: {
    tube: 4.5,
    town: 4.0,
    l4_ceil: 3.5,
    l4_simple: 3.0
  },
  K_EXTERIOR: {
    standard: 1.5,
    villa: 2.0
  },
  LABOR: {
    interior: 20000,
    exterior: 25000
  }
};

export const PRICE_LIST: PriceListCategory[] = [
  {
    title: { vi: 'BỘT BẢ', en: 'PUTTY' },
    items: [
      { id: 'G9B1', name: { vi: 'Bột bả nội thất cao cấp G9B1', en: 'Premium Interior Putty' }, unit: '40 kg', price: '359,000', priceValue: 359000, coverageValue: 1.2, type: 'putty', surface: 'interior' },
      { id: 'G9B2', name: { vi: 'Bột bả ngoại thất cao cấp G9B2', en: 'Premium Exterior Putty' }, unit: '40 kg', price: '448,000', priceValue: 448000, coverageValue: 1.2, type: 'putty', surface: 'exterior' },
    ]
  },
  {
    title: { vi: 'SƠN CHỐNG THẤM', en: 'WATERPROOF PAINT' },
    items: [
      { id: 'G5.5', name: { vi: 'Sơn chống thấm pha xi măng G5.5', en: 'Cement-based Waterproof' }, unit: '18L', price: '2,850,000', priceValue: 2850000, coverageValue: 14, type: 'waterproof', surface: 'exterior' },
      { id: 'G5.5', name: { vi: 'Sơn chống thấm pha xi măng G5.5', en: 'Cement-based Waterproof' }, unit: '5L', price: '860,000', priceValue: 860000, coverageValue: 14, type: 'waterproof', surface: 'exterior' },
      { id: 'G5.6', name: { vi: 'Sơn chống thấm thượng hạng G5.6', en: 'New Gen Premium Waterproof' }, unit: '18L', price: '4,350,000', priceValue: 4350000, coverageValue: 14, type: 'waterproof', surface: 'exterior' },
      { id: 'G5.6', name: { vi: 'Sơn chống thấm thượng hạng G5.6', en: 'New Gen Premium Waterproof' }, unit: '5L', price: '1,310,000', priceValue: 1310000, coverageValue: 14, type: 'waterproof', surface: 'exterior' },
      { id: 'G100', name: { vi: 'Chống thấm sàn G100 (Bộ 20kg)', en: 'Floor Waterproof G100 (20kg set)' }, unit: '20kg', price: '1,775,000', priceValue: 1775000, coverageValue: 5, type: 'waterproof', surface: 'exterior' },
      { id: 'G.15', name: { vi: 'Bitum chống thấm G.15', en: 'Bitumen Waterproof G.15' }, unit: '18kg', price: '2,250,000', priceValue: 2250000, coverageValue: 8, type: 'waterproof', surface: 'exterior' },
    ]
  },
  {
    title: { vi: 'SƠN LÓT NỘI THẤT', en: 'INTERIOR PRIMER' },
    items: [
      { id: 'G6.4', name: { vi: 'Sơn lót nội thất cao cấp G6.4', en: 'Premium Interior Sealer' }, unit: '18L', price: '1,978,000', priceValue: 1978000, coverageValue: 14, type: 'primer', surface: 'interior' },
      { id: 'G6.4', name: { vi: 'Sơn lót nội thất cao cấp G6.4', en: 'Premium Interior Sealer' }, unit: '5L', price: '640,000', priceValue: 640000, coverageValue: 14, type: 'primer', surface: 'interior' },
      { id: 'G6.5', name: { vi: 'Sơn lót kháng kiềm nội thất cao cấp G6.5', en: 'High-end Interior Alkali Sealer' }, unit: '18L', price: '2,663,000', priceValue: 2663000, coverageValue: 14, type: 'primer', surface: 'interior' },
      { id: 'G6.5', name: { vi: 'Sơn lót kháng kiềm nội thất cao cấp G6.5', en: 'High-end Interior Alkali Sealer' }, unit: '5L', price: '810,000', priceValue: 810000, coverageValue: 14, type: 'primer', surface: 'interior' },
      { id: 'G9.0', name: { vi: 'Sơn lót kháng muối nội thất G9.0', en: 'Interior Salt Resistant Primer' }, unit: '18L', price: '3,150,000', priceValue: 3150000, coverageValue: 12, type: 'primer', surface: 'interior' },
    ]
  },
  {
    title: { vi: 'SƠN LÓT NGOẠI THẤT', en: 'EXTERIOR PRIMER' },
    items: [
      { id: 'G6.6', name: { vi: 'Sơn lót kháng kiềm ngoại thất kinh tế G6.6', en: 'Eco Exterior Alkali Sealer' }, unit: '18L', price: '2,482,000', priceValue: 2482000, coverageValue: 12, type: 'primer', surface: 'exterior' },
      { id: 'G6.6', name: { vi: 'Sơn lót kháng kiềm ngoại thất kinh tế G6.6', en: 'Eco Exterior Alkali Sealer' }, unit: '5L', price: '826,000', priceValue: 826000, coverageValue: 12, type: 'primer', surface: 'exterior' },
      { id: 'G6.7', name: { vi: 'Sơn lót kháng kiềm ngoại ngoại thất cao cấp G6.7', en: 'Premium Exterior Alkali Sealer' }, unit: '18L', price: '3,330,000', priceValue: 3330000, coverageValue: 14, type: 'primer', surface: 'exterior' },
      { id: 'G6.7', name: { vi: 'Sơn lót kháng kiềm ngoại thất cao cấp G6.7', en: 'Premium Exterior Alkali Sealer' }, unit: '5L', price: '1,024,000', priceValue: 1024000, coverageValue: 14, type: 'primer', surface: 'exterior' },
      { id: 'G9.1', name: { vi: 'Sơn lót kháng muối ngoại thất G9.1', en: 'Exterior Salt Resistant Primer' }, unit: '18L', price: '3,850,000', priceValue: 3850000, coverageValue: 12, type: 'primer', surface: 'exterior' },
    ]
  },
  {
    title: { vi: 'SƠN PHỦ NỘI THẤT', en: 'INTERIOR TOPCOAT' },
    items: [
      { id: 'G8.1', name: { vi: 'Sơn siêu mịn nội thất cao cấp G8.1', en: 'Premium Interior Flat' }, unit: '18L', price: '1,746,000', priceValue: 1746000, coverageValue: 12, type: 'topcoat', tier: 'economic', surface: 'interior' },
      { id: 'G8.1', name: { vi: 'Sơn siêu mịn nội thất cao cấp G8.1', en: 'Premium Interior Flat' }, unit: '5L', price: '603,000', priceValue: 603000, coverageValue: 12, type: 'topcoat', tier: 'economic', surface: 'interior' },
      { id: 'G8.2', name: { vi: 'Sơn bóng Semi nội thất cao cấp G8.2', en: 'Premium Interior Semi-Gloss' }, unit: '18L', price: '2,107,000', priceValue: 2107000, coverageValue: 13, type: 'topcoat', tier: 'premium', surface: 'interior' },
      { id: 'G8.2', name: { vi: 'Sơn bóng Semi nội thất cao cấp G8.2', en: 'Premium Interior Semi-Gloss' }, unit: '5L', price: '677,000', priceValue: 677000, coverageValue: 13, type: 'topcoat', tier: 'premium', surface: 'interior' },
      { id: 'G8.4', name: { vi: 'Sơn bóng nội thất cao cấp G8.4', en: 'Premium Interior Gloss' }, unit: '18L', price: '4,180,000', priceValue: 4180000, coverageValue: 14, type: 'topcoat', tier: 'premium', surface: 'interior' },
      { id: 'G8.4', name: { vi: 'Sơn bóng nội thất cao cấp G8.4', en: 'Premium Interior Gloss' }, unit: '5L', price: '1,259,000', priceValue: 1259000, coverageValue: 14, type: 'topcoat', tier: 'premium', surface: 'interior' },
      { id: 'G8.5', name: { vi: 'Sơn siêu bóng nội thất cao cấp G8.5', en: 'Premium Interior Super Gloss' }, unit: '18L', price: '5,300,000', priceValue: 5300000, coverageValue: 15, type: 'topcoat', tier: 'super', surface: 'interior' },
      { id: 'G8.5', name: { vi: 'Sơn siêu bóng nội thất cao cấp G8.5', en: 'Premium Interior Super Gloss' }, unit: '5L', price: '1,580,000', priceValue: 1580000, coverageValue: 15, type: 'topcoat', tier: 'super', surface: 'interior' },
    ]
  },
  {
    title: { vi: 'SƠN PHỦ NGOẠI THẤT', en: 'EXTERIOR TOPCOAT' },
    items: [
      { id: 'G8.7', name: { vi: 'Sơn siêu mịn ngoại thất cao cấp G8.7', en: 'Premium Exterior Flat' }, unit: '18L', price: '2,410,000', priceValue: 2410000, coverageValue: 12, type: 'topcoat', tier: 'economic', surface: 'exterior' },
      { id: 'G8.7', name: { vi: 'Sơn siêu mịn ngoại thất cao cấp G8.7', en: 'Premium Exterior Flat' }, unit: '5L', price: '740,000', priceValue: 740000, coverageValue: 12, type: 'topcoat', tier: 'economic', surface: 'exterior' },
      { id: 'G8.8', name: { vi: 'Sơn bóng ngoại thất cao cấp G8.8', en: 'Premium Exterior Gloss' }, unit: '18L', price: '4,599,000', priceValue: 4599000, coverageValue: 14, type: 'topcoat', tier: 'premium', surface: 'exterior' },
      { id: 'G8.8', name: { vi: 'Sơn bóng ngoại thất cao cấp G8.8', en: 'Premium Exterior Gloss' }, unit: '5L', price: '1,442,000', priceValue: 1442000, coverageValue: 14, type: 'topcoat', tier: 'premium', surface: 'exterior' },
      { id: 'G8.9', name: { vi: 'Sơn siêu bóng ngoại thất cao cấp G8.9', en: 'Premium Exterior Super Gloss' }, unit: '18L', price: '5,685,000', priceValue: 5685000, coverageValue: 15, type: 'topcoat', tier: 'super', surface: 'exterior' },
      { id: 'G8.9', name: { vi: 'Sơn siêu bóng ngoại thất cao cấp G8.9', en: 'Premium Exterior Super Gloss' }, unit: '5L', price: '1,695,000', priceValue: 1695000, coverageValue: 15, type: 'topcoat', tier: 'super', surface: 'exterior' },
    ]
  },
  {
    title: { vi: 'SƠN SIÊU TRẮNG TRẦN', en: 'SUPER WHITE CEILING' },
    items: [
      { id: 'G8.6', name: { vi: 'Sơn siêu trắng trần cao cấp G8.6', en: 'Premium Super White Ceiling' }, unit: '18L', price: '2,375,000', priceValue: 2375000, coverageValue: 12, type: 'topcoat', tier: 'premium', surface: 'interior' },
      { id: 'G8.6', name: { vi: 'Sơn siêu trắng trần cao cấp G8.6', en: 'Premium Super White Ceiling' }, unit: '5L', price: '735,000', priceValue: 735000, coverageValue: 12, type: 'topcoat', tier: 'premium', surface: 'interior' },
      { id: 'G9.4', name: { vi: 'Sơn siêu trắng trần kháng muối G9.4', en: 'Salt Resistant Ceiling White' }, unit: '18L', price: '2,950,000', priceValue: 2950000, coverageValue: 12, type: 'topcoat', tier: 'premium', surface: 'interior' },
    ]
  },
  {
    title: { vi: 'SƠN ĐẶC BIỆT & CÔNG NGHIỆP', en: 'SPECIAL & INDUSTRIAL' },
    items: [
      { id: 'G9.7', name: { vi: 'Sơn giả đá G9.7', en: 'Stone Effect Paint' }, unit: '20kg', price: '1,850,000', priceValue: 1850000, coverageValue: 1, type: 'special', surface: 'exterior' },
      { id: 'G5.8', name: { vi: 'Sơn chống nóng mái tôn G5.8', en: 'Heat Shield for Roof' }, unit: '20kg', price: '3,250,000', priceValue: 3250000, coverageValue: 7, type: 'special', surface: 'exterior' },
      { id: 'G2000', name: { vi: 'Sơn Epoxy G2000', en: 'Epoxy Coating' }, unit: '20kg', price: '4,500,000', priceValue: 4500000, coverageValue: 7, type: 'epoxy', surface: 'interior' },
      { id: 'G.18', name: { vi: 'Sơn lót sắt G.18', en: 'Iron Primer' }, unit: '18L', price: '1,450,000', priceValue: 1450000, coverageValue: 10, type: 'industrial', surface: 'exterior' },
      { id: 'G.19', name: { vi: 'Sơn sắt G.19', en: 'Alkyd Iron Paint' }, unit: '18L', price: '1,850,000', priceValue: 1850000, coverageValue: 10, type: 'industrial', surface: 'exterior' },
    ]
  },
  {
    title: { vi: 'SƠN GIAO THÔNG', en: 'TRAFFIC PAINT' },
    items: [
      { id: 'G.8', name: { vi: 'Sơn Epoxy kẻ vạch G.8', en: 'Cold Traffic Paint' }, unit: '20kg', price: '2,450,000', priceValue: 2450000, coverageValue: 5, type: 'traffic', surface: 'exterior' },
      { id: 'G.12', name: { vi: 'Sơn nhiệt dẻo phản quang G.12', en: 'Thermoplastic Reflective' }, unit: '25kg', price: '550,000', priceValue: 550000, coverageValue: 3, type: 'traffic', surface: 'exterior' },
    ]
  }
];

export const COLOR_PRICES: any = {
  vi: [
    { name: 'Nhóm 1: Màu Nhạt', desc: 'Màu nhạt, độ che phủ tốt nhất', color: '#f8f9fa', range: 'AP001; AP1 đến AP14', interior: { l1: '4.000', l5: '18.000', l18: '59.000' }, exterior: { l1: '3.900', l5: '18.000', l18: '59.000' } },
    { name: 'Nhóm 2: Tông Trung Tính', desc: 'Tông trung tính, sang trọng, tinh tế', color: '#e9ecef', range: 'AP15 đến AP22', interior: { l1: '5.200', l5: '25.000', l18: '84.000' }, exterior: { l1: '5.200', l5: '24.700', l18: '84.000' } },
    { name: 'Nhóm 3: Màu Tiêu Chuẩn', desc: 'Màu sắc cơ bản, đa dạng lựa chọn', color: '#dee2e6', range: 'AP23 đến AP152 (Ký tự cuối 1,2,6)', interior: { l1: '5.200', l5: '25.000', l18: '84.000' }, exterior: { l1: '7.900', l5: '40.000', l18: '129.000' } },
    { name: 'Nhóm 4: Màu Rực Rỡ', desc: 'Màu rực rỡ, tốn nhiều tinh màu pha', color: '#ffd43b', range: 'AP23 đến AP152 (Ký tự cuối 3,5)', interior: { l1: '15.200', l5: '67.700', l18: '240.000' }, exterior: { l1: '25.000', l5: '88.000', l18: '435.000' } },
    { name: 'Nhóm 5: Màu Đậm', desc: 'Màu đậm, yêu cầu kỹ thuật thi công cao', color: '#f03e3e', range: 'AP23 đến AP152 (Ký tự cuối 4)', interior: { l1: '21.500', l5: '100.000', l18: '360.000' }, exterior: { l1: '31.000', l5: '152.000', l18: '544.000' } },
    { name: 'Nhóm 6: Màu Siêu Đậm', desc: 'Màu siêu đậm, chi phí pha màu cao nhất', color: '#1c7ed6', range: 'AP153 đến AP171 (Tất cả ký tự 1-6)', interior: { l1: '33.000', l5: '160.600', l18: '578.000' }, exterior: { l1: '42.000', l5: '205.000', l18: '739.000' } },
  ],
  en: [
    { name: 'Group 1: Light Colors', desc: 'Light colors, best coverage', color: '#f8f9fa', range: 'AP001; AP1 to AP14', interior: { l1: '4,000', l5: '18,000', l18: '59,000' }, exterior: { l1: '3,900', l5: '18,000', l18: '59,000' } },
    { name: 'Group 2: Neutral Tones', desc: 'Neutral, elegant, and sophisticated', color: '#e9ecef', range: 'AP15 to AP22', interior: { l1: '5,200', l5: '25,000', l18: '84,000' }, exterior: { l1: '5,200', l5: '24,700', l18: '84,000' } },
    { name: 'Group 3: Standard Colors', desc: 'Basic colors, diverse options', color: '#dee2e6', range: 'AP23 to AP152 (End with 1,2,6)', interior: { l1: '5,200', l5: '25,000', l18: '84,000' }, exterior: { l1: '7,900', l5: '40,000', l18: '129,000' } },
    { name: 'Group 4: Vibrant Colors', desc: 'Vibrant, requires more tinting paste', color: '#ffd43b', range: 'AP23 to AP152 (End with 3,5)', interior: { l1: '15,200', l5: '67,700', l18: '240,000' }, exterior: { l1: '25,000', l5: '88,000', l18: '435,000' } },
    { name: 'Group 5: Bold Colors', desc: 'Bold colors, requires high application skill', color: '#f03e3e', range: 'AP23 to AP152 (End with 4)', interior: { l1: '21,500', l5: '100,000', l18: '360,000' }, exterior: { l1: '31,000', l5: '152,000', l18: '544,000' } },
    { name: 'Group 6: Ultra Bold', desc: 'Deep colors, highest tinting cost', color: '#1c7ed6', range: 'AP153 to AP171 (All ends 1-6)', interior: { l1: '33,000', l5: '160,600', l18: '578,000' }, exterior: { l1: '42,000', l5: '205,000', l18: '739,000' } },
  ]
};

export const FAN_DECK = [
  // Group 1: Light colors
  { code: 'AP1-1', hex: '#f2f2eb', group: 'AP001; AP1 đến AP14' },
  { code: 'AP2-1', hex: '#f7f6f1', group: 'AP001; AP1 đến AP14' },
  { code: 'AP3-1', hex: '#faf9f5', group: 'AP001; AP1 đến AP14' },
  { code: 'AP4-1', hex: '#fdfcf0', group: 'AP001; AP1 đến AP14' },
  { code: 'AP5-1', hex: '#f8f4e6', group: 'AP001; AP1 đến AP14' },
  // Group 2: Neutrals
  { code: 'AP15-1', hex: '#e3e1d5', group: 'AP15 đến AP22' },
  { code: 'AP16-1', hex: '#dedcd0', group: 'AP15 đến AP22' },
  { code: 'AP17-1', hex: '#dbd9cd', group: 'AP15 đến AP22' },
  { code: 'AP18-1', hex: '#d6d3c5', group: 'AP15 đến AP22' },
  { code: 'AP19-1', hex: '#d1cdc0', group: 'AP15 đến AP22' },
  // Group 3: Standard colors (End with 1,2,6)
  { code: 'AP23-1', hex: '#c5d1eb', group: 'AP23 đến AP152 (Ký tự cuối 1,2,6)' },
  { code: 'AP24-1', hex: '#92a8d1', group: 'AP23 đến AP152 (Ký tự cuối 1,2,6)' },
  { code: 'AP25-1', hex: '#f7cac9', group: 'AP23 đến AP152 (Ký tự cuối 1,2,6)' },
  { code: 'AP26-1', hex: '#88b04b', group: 'AP23 đến AP152 (Ký tự cuối 1,2,6)' },
  { code: 'AP27-1', hex: '#ff6f61', group: 'AP23 đến AP152 (Ký tự cuối 1,2,6)' },
  // Group 4: Vibrant colors (End with 3,5)
  { code: 'AP23-3', hex: '#ffcc33', group: 'AP23 đến AP152 (Ký tự cuối 3,5)' },
  { code: 'AP24-3', hex: '#ff9900', group: 'AP23 đến AP152 (Ký tự cuối 3,5)' },
  { code: 'AP25-3', hex: '#ff3300', group: 'AP23 đến AP152 (Ký tự cuối 3,5)' },
  { code: 'AP26-3', hex: '#ecdb54', group: 'AP23 đến AP152 (Ký tự cuối 3,5)' },
  { code: 'AP27-3', hex: '#e94b3c', group: 'AP23 đến AP152 (Ký tự cuối 3,5)' },
  // Group 5: Bold colors (End with 4)
  { code: 'AP23-4', hex: '#cc0000', group: 'AP23 đến AP152 (Ký tự cuối 4)' },
  { code: 'AP24-4', hex: '#990000', group: 'AP23 đến AP152 (Ký tự cuối 4)' },
  { code: 'AP25-4', hex: '#660000', group: 'AP23 đến AP152 (Ký tự cuối 4)' },
  { code: 'AP26-4', hex: '#440101', group: 'AP23 đến AP152 (Ký tự cuối 4)' },
  { code: 'AP27-4', hex: '#330000', group: 'AP23 đến AP152 (Ký tự cuối 4)' },
  // Group 6: Ultra bold
  { code: 'AP153-1', hex: '#002366', group: 'AP153 đến AP171 (Tất cả ký tự 1-6)' },
  { code: 'AP154-1', hex: '#000080', group: 'AP153 đến AP171 (Tất cả ký tự 1-6)' },
  { code: 'AP155-1', hex: '#000000', group: 'AP153 đến AP171 (Tất cả ký tự 1-6)' },
  { code: 'AP156-1', hex: '#191970', group: 'AP153 đến AP171 (Tất cả ký tự 1-6)' },
  { code: 'AP157-1', hex: '#3b3c36', group: 'AP153 đến AP171 (Tất cả ký tự 1-6)' },
];


