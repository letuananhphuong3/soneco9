/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Leaf, 
  Droplets, 
  ShieldCheck, 
  ChevronRight, 
  PaintBucket, 
  Calculator, 
  Palette, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram,
  Menu,
  X,
  ExternalLink,
  Info,
  ArrowRight,
  Zap,
  Target,
  Globe,
  Building2,
  ArrowUpRight,
  Clock,
  Home,
  Plus,
  Trash2,
  Cpu,
  Save,
  LogIn,
  LogOut,
  Settings,
  Image as ImageIcon
} from 'lucide-react';
import { PRODUCTS, NAV_LINKS, Product, Project, PARTNERS, PROJECTS, FEATURES_7, CRITERIA_9, TRANSLATIONS, PRICE_LIST, COLOR_PRICES, CALC_CONSTANTS, FAN_DECK } from './data';
import { 
  db, 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  collection, 
  onSnapshot, 
  query, 
  orderBy,
  doc,
  setDoc,
  deleteDoc,
  handleFirestoreError,
  OperationType,
  storage,
  ref,
  uploadBytes,
  getDownloadURL
} from './lib/firebase';

export interface Dealer {
  id: string;
  name: string;
  region: 'North' | 'Central' | 'South';
  address: string;
  phone: string;
}

// Helper Components for Admin
function AdminProductItem({ product, onSave, onDelete, lang }: { product: Product, onSave: (p: Product) => Promise<void>, onDelete: (id: string) => Promise<void>, lang: 'vi' | 'en', key?: any }) {
  const [editing, setEditing] = React.useState(false);
  const [localProduct, setLocalProduct] = React.useState(product);
  const [uploading, setUploading] = React.useState(false);

  const handleFieldChange = (field: keyof Product, value: any) => {
    setLocalProduct(prev => ({ ...prev, [field]: value }));
  };

  const handleDescChange = (lang: 'vi' | 'en', value: string) => {
    setLocalProduct(prev => ({
      ...prev,
      description: { ...prev.description, [lang]: value }
    }));
  };

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      if (!storage) throw new Error("Firebase Storage is not initialized.");
      
      const uploadPromise = async () => {
        const storageRef = ref(storage, `products/${localProduct.id || Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      };

      // Timeout after 60s
      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Hết thời gian tải lên (Timeout - 60s). Hãy kiểm tra kết nối mạng và kích thước ảnh.")), 60000));
      
      const url = await Promise.race([uploadPromise(), timeout]) as string;
      handleFieldChange('image', url);
    } catch (error: any) {
      console.error("Product upload error details:", error);
      let msg = error.message || 'Lỗi không xác định';
      if (msg.includes('storage/unauthorized')) msg = "Bạn không có quyền tải ảnh lên. Hãy kiểm tra rules của Firebase Storage.";
      if (msg.includes('storage/retry-limit-exceeded')) msg = "Quá giới hạn thử lại. Vui lòng kiểm tra lại kết nối mạng.";
      alert(`Lỗi khi tải ảnh lên: ${msg}.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-xl border border-brand-charcoal/5 flex flex-col md:flex-row gap-8 group">
       <div className="w-40 shrink-0 mx-auto md:mx-0">
          <div className="relative aspect-square rounded-2xl overflow-hidden bg-brand-light mb-4 group/img border border-brand-charcoal/5">
             {uploading ? (
               <div className="absolute inset-0 bg-brand-charcoal/20 flex items-center justify-center">
                  <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
               </div>
             ) : (
               <img 
                 src={localProduct.image} 
                 alt={localProduct.name} 
                 className="w-full h-full object-cover" 
                 referrerPolicy="no-referrer"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://placehold.co/600x400?text=Image+Error';
                 }}
               />
             )}
             {editing && (
               <div className="absolute inset-0 bg-brand-charcoal/60 flex flex-col items-center justify-center p-4 gap-2">
                  <label className="cursor-pointer bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors">
                    <ImageIcon size={20} className="text-white" />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageFileChange}
                      disabled={uploading}
                    />
                  </label>
                  <input 
                    type="text" 
                    value={localProduct.image} 
                    onChange={(e) => handleFieldChange('image', e.target.value)}
                    className="w-full bg-white/90 rounded px-2 py-1 text-[8px] font-mono"
                    placeholder="Hoặc dán URL"
                  />
               </div>
             )}
          </div>
          <p className="text-[10px] font-black uppercase text-brand-charcoal/40 text-center tracking-widest">{localProduct.id}</p>
       </div>
       
       <div className="flex-1 space-y-4">
          {editing ? (
            <div className="space-y-4">
               <input 
                 type="text" 
                 value={localProduct.name} 
                 onChange={(e) => handleFieldChange('name', e.target.value)}
                 className="w-full text-2xl font-black bg-brand-light rounded-xl px-4 py-2 border-none focus:ring-2 focus:ring-brand-green"
               />
               <textarea 
                 value={localProduct.description.vi} 
                 onChange={(e) => handleDescChange('vi', e.target.value)}
                 className="w-full text-sm font-medium bg-brand-light rounded-xl px-4 py-2 h-20 border-none focus:ring-2 focus:ring-brand-green"
                 placeholder="Mô tả tiếng Việt"
               />
               <textarea 
                 value={localProduct.description.en} 
                 onChange={(e) => handleDescChange('en', e.target.value)}
                 className="w-full text-sm font-medium bg-brand-light rounded-xl px-4 py-2 h-20 border-none focus:ring-2 focus:ring-brand-green"
                 placeholder="English Description"
               />
               <div className="grid grid-cols-3 gap-4">
                 <div className="space-y-1">
                   <label className="text-[8px] font-black uppercase text-brand-charcoal/40 ml-2 tracking-widest">Giá (VNĐ)</label>
                   <input 
                     type="text" 
                     value={localProduct.price} 
                     onChange={(e) => handleFieldChange('price', e.target.value)}
                     className="w-full bg-brand-light rounded-lg px-4 py-2 text-xs font-bold"
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[8px] font-black uppercase text-brand-charcoal/40 ml-2 tracking-widest">Độ phủ (m2/l)</label>
                   <input 
                     type="text" 
                     value={localProduct.coverage} 
                     onChange={(e) => handleFieldChange('coverage', e.target.value)}
                     className="w-full bg-brand-light rounded-lg px-4 py-2 text-xs font-bold"
                   />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[8px] font-black uppercase text-brand-charcoal/40 ml-2 tracking-widest">Sấy khô</label>
                   <input 
                     type="text" 
                     value={localProduct.dryingTime.vi} 
                     onChange={(e) => setLocalProduct({...localProduct, dryingTime: {...localProduct.dryingTime, vi: e.target.value}})}
                     className="w-full bg-brand-light rounded-lg px-4 py-2 text-xs font-bold"
                   />
                 </div>
               </div>
            </div>
          ) : (
            <div className="space-y-2">
               <h3 className="text-2xl font-black text-brand-charcoal tracking-tight group-hover:text-brand-green transition-colors">{localProduct.name}</h3>
               <p className="text-sm text-brand-charcoal/50 line-clamp-2 font-medium leading-relaxed">{localProduct.description.vi}</p>
               <div className="flex gap-4 items-center pt-4">
                  <div className="bg-brand-green/10 px-4 py-1.5 rounded-full text-[10px] font-black text-brand-green uppercase tracking-widest">{localProduct.category}</div>
                  <div className="text-xl font-sans font-black text-brand-charcoal">{localProduct.price === 'Liên hệ' ? 'Liên hệ' : `${localProduct.price}đ`}</div>
               </div>
            </div>
          )}
          
          <div className="flex justify-end gap-3 pt-6 border-t border-brand-charcoal/5">
             {editing ? (
               <>
                 <button 
                   onClick={() => {
                     onSave(localProduct);
                     setEditing(false);
                   }}
                   className="flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:bg-brand-green/80"
                 >
                   <Save size={14} /> Lưu
                 </button>
                 <button 
                   onClick={() => {
                     setLocalProduct(product);
                     setEditing(false);
                   }}
                   className="px-6 py-3 rounded-2xl bg-brand-charcoal/5 text-brand-charcoal/60 text-[10px] font-black uppercase tracking-widest hover:bg-brand-charcoal/10"
                 >
                    Hủy
                 </button>
               </>
             ) : (
               <>
                 <button 
                   onClick={() => setEditing(true)}
                   className="p-3 bg-brand-charcoal/5 rounded-xl hover:bg-brand-green/10 text-brand-charcoal/40 hover:text-brand-green transition-all"
                 >
                   <Settings size={18} />
                 </button>
                 <button 
                   onClick={() => onDelete(localProduct.id)}
                   className="p-3 bg-brand-charcoal/5 rounded-xl hover:bg-red-50 text-brand-charcoal/40 hover:text-red-500 transition-all"
                 >
                   <Trash2 size={18} />
                 </button>
               </>
             )}
          </div>
       </div>
    </div>
  );
}

function AdminCertItem({ cert, onSave, onDelete }: { cert: any, onSave: (c: any) => Promise<void>, onDelete: (id: string) => Promise<void>, key?: any }) {
  const [editing, setEditing] = React.useState(false);
  const [localCert, setLocalCert] = React.useState(cert);
  const [uploading, setUploading] = React.useState(false);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      if (!storage) throw new Error("Firebase Storage is not initialized.");
      
      const uploadPromise = async () => {
        const storageRef = ref(storage, `certificates/${localCert.id || Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      };

      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Hết thời gian tải lên (Timeout - 60s).")), 60000));
      
      const url = await Promise.race([uploadPromise(), timeout]) as string;
      setLocalCert({ ...localCert, imageUrl: url });
    } catch (error: any) {
      console.error("Cert upload error:", error);
      alert(`Lỗi khi tải ảnh lên: ${error.message || 'Lỗi không xác định'}.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-brand-charcoal/5 group">
       <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-light mb-6 relative border border-brand-charcoal/5">
          {uploading ? (
             <div className="absolute inset-0 bg-brand-charcoal/20 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
             </div>
          ) : (
             <img 
               src={localCert.imageUrl} 
               alt={localCert.title} 
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://placehold.co/400x600?text=Certificate';
               }}
             />
          )}
          {editing && (
             <div className="absolute inset-0 bg-brand-charcoal/60 flex items-center justify-center">
                <label className="cursor-pointer bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors">
                   <ImageIcon size={32} className="text-white" />
                   <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageFileChange}
                      disabled={uploading}
                   />
                </label>
             </div>
          )}
       </div>
       {editing ? (
         <div className="space-y-4">
           <input 
             type="text" 
             value={localCert.title}
             onChange={(e) => setLocalCert({ ...localCert, title: e.target.value })}
             className="w-full bg-brand-light rounded-xl px-4 py-2 font-bold text-sm"
             placeholder="Certificate Title"
           />
           <input 
             type="text" 
             value={localCert.imageUrl}
             onChange={(e) => setLocalCert({ ...localCert, imageUrl: e.target.value })}
             className="w-full bg-brand-light rounded-xl px-4 py-2 text-[10px] font-mono"
             placeholder="Image URL"
           />
           <div className="flex gap-2 justify-end pt-2">
             <button 
               onClick={() => {
                 onSave(localCert);
                 setEditing(false);
               }}
               className="bg-brand-green text-white p-2 px-3 rounded-lg text-[8px] font-black uppercase tracking-widest"
             >
                Lưu
             </button>
             <button 
               onClick={() => setEditing(false)}
               className="bg-brand-charcoal/5 text-brand-charcoal/40 p-2 px-3 rounded-lg text-[8px] font-black uppercase tracking-widest"
             >
                Hủy
             </button>
           </div>
         </div>
       ) : (
         <div className="flex justify-between items-center">
            <h3 className="font-black text-brand-charcoal text-xs uppercase tracking-tight">{localCert.title}</h3>
            <div className="flex gap-2">
               <button onClick={() => setEditing(true)} className="p-2 text-brand-charcoal/30 hover:text-brand-green transition-colors"><Settings size={14} /></button>
               <button onClick={() => onDelete(localCert.id)} className="p-2 text-brand-charcoal/30 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            </div>
         </div>
       )}
    </div>
  );
}

function AdminDealerItem({ dealer, onSave, onDelete }: { dealer: Dealer, onSave: (d: Dealer) => Promise<void>, onDelete: (id: string) => Promise<void>, key?: any }) {
  const [editing, setEditing] = React.useState(false);
  const [localDealer, setLocalDealer] = React.useState(dealer);

  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-brand-charcoal/5 group">
       {editing ? (
         <div className="space-y-4">
           <input 
             type="text" 
             value={localDealer.name} 
             onChange={(e) => setLocalDealer({...localDealer, name: e.target.value})}
             className="w-full bg-brand-light rounded-xl px-4 py-2 font-bold text-sm"
             placeholder="Tên đại lý"
           />
           <select 
             value={localDealer.region} 
             onChange={(e) => setLocalDealer({...localDealer, region: e.target.value as any})}
             className="w-full bg-brand-light rounded-xl px-4 py-2 text-sm"
           >
             <option value="North">Miền Bắc</option>
             <option value="Central">Miền Trung</option>
             <option value="South">Miền Nam</option>
           </select>
           <input 
             type="text" 
             value={localDealer.address} 
             onChange={(e) => setLocalDealer({...localDealer, address: e.target.value})}
             className="w-full bg-brand-light rounded-xl px-4 py-2 text-xs"
             placeholder="Địa chỉ"
           />
           <input 
             type="text" 
             value={localDealer.phone} 
             onChange={(e) => setLocalDealer({...localDealer, phone: e.target.value})}
             className="w-full bg-brand-light rounded-xl px-4 py-2 text-xs"
             placeholder="Số điện thoại"
           />
           <div className="flex gap-2 justify-end pt-2">
             <button 
               onClick={() => {
                 onSave(localDealer);
                 setEditing(false);
               }}
               className="bg-brand-green text-white p-2 px-3 rounded-lg text-[8px] font-black uppercase tracking-widest"
             >
                Lưu
             </button>
             <button 
               onClick={() => setEditing(false)}
               className="bg-brand-charcoal/5 text-brand-charcoal/40 p-2 px-3 rounded-lg text-[8px] font-black uppercase tracking-widest"
             >
                Hủy
             </button>
           </div>
         </div>
       ) : (
         <div>
            <div className="flex justify-between items-start mb-4">
               <div>
                  <div className="text-[8px] font-black uppercase tracking-widest text-brand-green bg-brand-green/10 px-2 py-0.5 rounded-full inline-block mb-1">
                     {localDealer.region === 'North' ? 'Miền Bắc' : localDealer.region === 'Central' ? 'Miền Trung' : 'Miền Nam'}
                  </div>
                  <h3 className="font-black text-brand-charcoal text-sm uppercase tracking-tight">{localDealer.name}</h3>
               </div>
               <div className="flex gap-2">
                  <button onClick={() => setEditing(true)} className="p-2 text-brand-charcoal/30 hover:text-brand-green transition-colors"><Settings size={14} /></button>
                  <button onClick={() => onDelete(localDealer.id)} className="p-2 text-brand-charcoal/30 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
               </div>
            </div>
            <div className="space-y-1">
               <p className="text-[10px] text-brand-charcoal/50 font-medium flex items-start gap-2">
                  <MapPin size={10} className="shrink-0 mt-0.5" /> {localDealer.address}
               </p>
               <p className="text-[10px] text-brand-charcoal/50 font-black flex items-center gap-2">
                  <Phone size={10} className="shrink-0" /> {localDealer.phone}
               </p>
            </div>
         </div>
       )}
    </div>
  );
}

function AdminProjectItem({ project, onSave, onDelete }: { project: Project, onSave: (p: Project) => Promise<void>, onDelete: (id: string) => Promise<void>, key?: any }) {
  const [editing, setEditing] = React.useState(false);
  const [localProject, setLocalProject] = React.useState(project);
  const [uploading, setUploading] = React.useState(false);

  const handleImageFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      if (!storage) throw new Error("Firebase Storage is not initialized.");
      
      const uploadPromise = async () => {
        const storageRef = ref(storage, `projects/${localProject.id || Date.now()}-${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
      };

      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error("Hết thời gian tải lên (Timeout - 60s).")), 60000));
      
      const url = await Promise.race([uploadPromise(), timeout]) as string;
      setLocalProject({ ...localProject, image: url });
    } catch (error: any) {
      console.error("Project upload error:", error);
      alert(`Lỗi khi tải ảnh lên: ${error.message || 'Lỗi không xác định'}.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-[2.5rem] shadow-lg border border-brand-charcoal/5 group">
       <div className="aspect-video rounded-2xl overflow-hidden bg-brand-light mb-6 relative border border-brand-charcoal/5">
          {uploading ? (
             <div className="absolute inset-0 bg-brand-charcoal/20 flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin" />
             </div>
          ) : (
             <img 
               src={localProject.image} 
               alt={localProject.name} 
               className="w-full h-full object-cover" 
               referrerPolicy="no-referrer"
               onError={(e) => {
                 (e.target as HTMLImageElement).src = 'https://placehold.co/800x450?text=Project';
               }}
             />
          )}
          {editing && (
             <div className="absolute inset-0 bg-brand-charcoal/60 flex items-center justify-center">
                <label className="cursor-pointer bg-white/20 hover:bg-white/30 p-4 rounded-full transition-colors">
                   <ImageIcon size={32} className="text-white" />
                   <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageFileChange}
                      disabled={uploading}
                   />
                </label>
             </div>
          )}
       </div>
       {editing ? (
         <div className="space-y-4">
           <input 
             type="text" 
             value={localProject.name}
             onChange={(e) => setLocalProject({ ...localProject, name: e.target.value })}
             className="w-full bg-brand-light rounded-xl px-4 py-2 font-bold text-sm"
             placeholder="Tên dự án"
           />
           <div className="grid grid-cols-2 gap-2">
             <input 
               type="text" 
               value={localProject.type.vi}
               onChange={(e) => setLocalProject({ ...localProject, type: { ...localProject.type, vi: e.target.value } })}
               className="w-full bg-brand-light rounded-xl px-4 py-2 text-[10px]"
               placeholder="Loại (Vi)"
             />
             <input 
               type="text" 
               value={localProject.type.en}
               onChange={(e) => setLocalProject({ ...localProject, type: { ...localProject.type, en: e.target.value } })}
               className="w-full bg-brand-light rounded-xl px-4 py-2 text-[10px]"
               placeholder="Loại (En)"
             />
           </div>
           <div className="flex gap-2 justify-end pt-2">
             <button 
               onClick={() => {
                 onSave(localProject);
                 setEditing(false);
               }}
               className="bg-brand-green text-white p-2 px-3 rounded-lg text-[8px] font-black uppercase tracking-widest"
             >
                Lưu
             </button>
             <button 
               onClick={() => setEditing(false)}
               className="bg-brand-charcoal/5 text-brand-charcoal/40 p-2 px-3 rounded-lg text-[8px] font-black uppercase tracking-widest"
             >
                Hủy
             </button>
           </div>
         </div>
       ) : (
         <div className="flex justify-between items-center">
            <div>
               <div className="text-[8px] font-black uppercase text-brand-accent tracking-widest mb-1">{localProject.type.vi}</div>
               <h3 className="font-black text-brand-charcoal text-xs uppercase tracking-tight">{localProject.name}</h3>
            </div>
            <div className="flex gap-2">
               <button onClick={() => setEditing(true)} className="p-2 text-brand-charcoal/30 hover:text-brand-green transition-colors"><Settings size={14} /></button>
               <button onClick={() => onDelete(localProject.id)} className="p-2 text-brand-charcoal/30 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
            </div>
         </div>
       )}
    </div>
  );
}

function DealerSection({ lang }: { lang: 'vi' | 'en' }) {
  const nppData = {
    title: lang === 'vi' ? 'NHÀ PHÂN PHỐI (NPP)' : 'DISTRIBUTOR (NPP)',
    conditions: [
      lang === 'vi' ? 'Pháp lý của NPP là Doanh nghiệp' : 'Legal entity must be an Enterprise',
      lang === 'vi' ? 'Độ tuổi của chủ Doanh nghiệp từ 30 đến 50 tuổi' : 'Business owner age between 30 - 50',
      lang === 'vi' ? 'Mặt bằng Showroom từ 70m2 – 100m2' : 'Showroom area from 70m2 – 100m2',
      lang === 'vi' ? 'Có uy tín & mối quan hệ - Năng lực tài chính tốt' : 'Reputation & relationships - Strong financial capacity',
      lang === 'vi' ? 'Đơn hàng đầu từ 200 triệu – 500 triệu đồng' : 'First order from 200M – 500M VND'
    ],
    policies: [
      lang === 'vi' ? 'Chiết khấu cố định ở mức cao trong ngành' : 'Highest fixed discount in the industry',
      lang === 'vi' ? 'Thưởng hàng tháng lên tới 5% – 15%' : 'Monthly bonus up to 5% – 15%',
      lang === 'vi' ? 'Thưởng năm từ 4% – 12% doanh số' : 'Annual bonus from 4% – 12% revenue',
      lang === 'vi' ? 'Chương trình nghỉ dưỡng trong và ngoài nước' : 'Domestic and international vacation program',
      lang === 'vi' ? 'Hỗ trợ thiết kế Showroom, biển bảng miễn phí' : 'Free Showroom and signage design support',
      lang === 'vi' ? 'Hỗ trợ mượn máy pha màu trị giá 225.000.000đ' : 'Lending color mixer worth 225,000,000 VND',
      lang === 'vi' ? 'Hỗ trợ công cụ, vật tư, Catalogue, bảo hộ...' : 'Tools, materials, Catalogue, protection gear support',
      lang === 'vi' ? 'Hỗ trợ phần mềm bán hàng - Truyền thông quảng cáo' : 'Sales software support - Media and advertising'
    ]
  };

  const dealerData = {
    title: lang === 'vi' ? 'ĐẠI LÝ CHÍNH THỨC' : 'OFFICIAL DEALER',
    conditions: [
      lang === 'vi' ? 'Có uy tín và mối quan hệ trên địa bàn' : 'Have reputation and local relationships',
      lang === 'vi' ? 'Có năng lực tài chính đảm bảo' : 'Guaranteed financial capacity',
      lang === 'vi' ? 'Đơn hàng đầu từ 50 triệu đồng trở lên' : 'First order from 50 million VND or more'
    ],
    policies: [
      lang === 'vi' ? 'Chiết khấu cố định cao' : 'High fixed discount',
      lang === 'vi' ? 'Thưởng hàng tháng lên tới 10% đơn hàng' : 'Monthly bonus up to 10% per order',
      lang === 'vi' ? 'Thưởng năm từ 5% – 10% doanh số' : 'Annual bonus from 5% – 10% revenue',
      lang === 'vi' ? 'Thưởng nóng: Tặng vàng, USD may mắn...' : 'Hot bonus: Gold, Lucky USD...',
      lang === 'vi' ? 'Chương trình nghỉ dưỡng trong và ngoài nước' : 'Domestic and international vacation program'
    ]
  };

  const TableColumn = ({ title, data, accentColor = "brand-green", icon }: { title: string, data: any, accentColor?: string, icon: React.ReactNode }) => (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group h-full"
    >
      <div className={`absolute -inset-0.5 bg-gradient-to-b from-${accentColor} to-transparent opacity-10 group-hover:opacity-30 rounded-[3rem] blur transition duration-500`} />
      <div className="relative bg-white rounded-[3rem] p-8 shadow-2xl border border-brand-charcoal/5 flex flex-col h-full overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className={`w-12 h-12 bg-${accentColor}/10 rounded-2xl flex items-center justify-center text-${accentColor}`}>
            {icon}
          </div>
          <div>
            <h3 className="text-xl font-black text-brand-charcoal uppercase tracking-tighter leading-tight">{title}</h3>
            <p className="text-[9px] font-black text-brand-charcoal/40 uppercase tracking-widest">{lang === 'vi' ? 'Chính sách An Giang' : 'An Giang Policy'}</p>
          </div>
        </div>
        
        <div className="space-y-6 flex-1">
          <div>
            <h4 className="text-[10px] font-black text-brand-charcoal/30 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <Info size={12} /> {lang === 'vi' ? 'ĐIỀU KIỆN' : 'CONDITIONS'}
            </h4>
            <div className="space-y-2">
              {data.conditions.map((item: string, i: number) => (
                <div key={i} className="flex gap-3 text-xs font-medium text-brand-charcoal/70">
                  <span className="text-brand-accent mt-1">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-6 border-t border-brand-charcoal/5">
            <h4 className="text-[10px] font-black text-brand-green/60 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
              <ShieldCheck size={12} /> {lang === 'vi' ? 'CHÍNH SÁCH ƯU ĐÃI' : 'BENEFIT POLICIES'}
            </h4>
            <div className="space-y-3">
              {data.policies.map((item: string, i: number) => (
                <div key={i} className="flex gap-3 p-3 bg-brand-light/50 rounded-xl border border-brand-charcoal/5 hover:bg-white hover:shadow-sm transition-all text-xs font-bold text-brand-charcoal">
                  <ChevronRight size={14} className="text-brand-green shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button className={`mt-10 w-full py-5 rounded-2xl border-2 border-brand-charcoal text-brand-charcoal font-black uppercase tracking-widest text-[10px] hover:bg-brand-charcoal hover:text-white transition-all duration-500`}>
          {lang === 'vi' ? 'LIÊN HỆ HỢP TÁC' : 'CONTACT FOR PARTNERSHIP'}
        </button>
      </div>
    </motion.div>
  );

  return (
    <section id="dealer-partnership" className="py-40 bg-brand-light relative overflow-hidden">
      <div className="section-container relative z-10">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-green font-black tracking-[0.6em] uppercase text-[10px] mb-8 block drop-shadow-sm"
          >
            {lang === 'vi' ? 'Hợp tác phát triển cùng G9ECO' : 'Grow together with G9ECO'}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black text-brand-charcoal mb-10 leading-[1.1] tracking-tighter"
          >
            {lang === 'vi' ? 'Chế độ đối tác' : 'Partner Policies'} <br />
            <span className="text-brand-green">{lang === 'vi' ? 'NPP & Đại lý' : 'Distributor & Dealer'}</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-xl text-brand-charcoal/60 max-w-3xl mx-auto font-medium"
          >
            {lang === 'vi' 
              ? 'Tận hưởng hệ sinh thái hỗ trợ toàn diện từ A-Z, đảm bảo lợi nhuận tối ưu và sự phát triển bền vững trong ngành sơn nước.'
              : 'Enjoy a comprehensive A-Z support ecosystem, ensuring optimal profit and sustainable growth in the water-based paint industry.'}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch max-w-5xl mx-auto">
          <TableColumn 
            title={nppData.title}
            data={nppData}
            accentColor="brand-green"
            icon={<Target size={24} />}
          />
          <TableColumn 
            title={dealerData.title}
            data={dealerData}
            accentColor="brand-gold"
            icon={<Building2 size={24} />}
          />
        </div>


      </div>
    </section>
  );
}

function DealerNetwork({ lang }: { lang: 'vi' | 'en' }) {
  const regions = [
    { name: lang === 'vi' ? 'Miền Bắc' : 'North', count: 120 },
    { name: lang === 'vi' ? 'Miền Trung' : 'Central', count: 45 },
    { name: lang === 'vi' ? 'Miền Nam' : 'South', count: 85 },
  ];

  return (
    <section id="partners" className="py-32 bg-brand-light overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <span className="text-brand-green font-black tracking-[0.6em] uppercase text-[10px] mb-8 block">
              {lang === 'vi' ? 'Hệ thống phân phối' : 'Distribution Network'}
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-brand-charcoal mb-8 leading-tight">
              {lang === 'vi' ? 'Tìm kiếm Đại lý G9ECO gần bạn' : 'Find G9ECO Dealer Near You'}
            </h2>
            <p className="text-lg text-brand-charcoal/60 mb-12">
              {lang === 'vi' 
                ? 'Với hơn 250 đại lý và NPP trên toàn quốc, G9ECO luôn sẵn sàng phục vụ mọi công trình. Hãy nhập địa chỉ của bạn để tìm điểm cung cấp chính hãng gần nhất.'
                : 'With over 250 dealers and distributors nationwide, G9ECO is always ready to serve. Enter your address to find the nearest genuine supplier.'}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex-1 relative">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 text-brand-green" size={20} />
                <input 
                  type="text" 
                  placeholder={lang === 'vi' ? "Nhập tỉnh thành / quận huyện..." : "Enter province / district..."}
                  className="w-full bg-white border-2 border-brand-charcoal/5 rounded-2xl py-5 pl-16 pr-6 focus:border-brand-green outline-none transition-all font-medium"
                />
              </div>
              <button className="bg-brand-charcoal text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-brand-green transition-all whitespace-nowrap">
                {lang === 'vi' ? 'TÌM KIẾM' : 'SEARCH'}
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6">
              {regions.map((r, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black text-brand-charcoal mb-1">{r.count}+</div>
                  <div className="text-[10px] font-black text-brand-charcoal/30 uppercase tracking-widest">{r.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square bg-white rounded-[4rem] shadow-2xl overflow-hidden p-8 border border-brand-charcoal/5">
              <div className="w-full h-full bg-brand-light rounded-[3rem] relative flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <Globe className="w-full h-full scale-150 rotate-12" />
                </div>
                <div className="relative z-10 text-center space-y-6">
                  <div className="w-20 h-20 bg-brand-green text-white rounded-3xl flex items-center justify-center mx-auto shadow-xl">
                    <MapPin size={40} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-2xl font-black text-brand-charcoal uppercase tracking-tight">An Giang Market</div>
                    <div className="text-brand-green font-bold">45 Points of Sales</div>
                  </div>
                  <button className="text-brand-accent font-black text-sm uppercase tracking-widest flex items-center gap-2 mx-auto hover:gap-4 transition-all">
                    {lang === 'vi' ? 'XEM DANH SÁCH CHI TIẾT' : 'VIEW FULL LIST'} <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


export default function App() {
  const [lang, setLang] = useState<'vi' | 'en'>('vi');
  const t = TRANSLATIONS[lang];
  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  
  // Firebase State
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [dbCertificates, setDbCertificates] = useState<any[]>([]);
  const [dbDealers, setDbDealers] = useState<Dealer[]>([]);
  const [dbProjects, setDbProjects] = useState<Project[]>([]);
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [selectedZoomImage, setSelectedZoomImage] = useState<string | null>(null);

  useEffect(() => {
    // 1. Fetch Products from Firestore
    const unsubProducts = onSnapshot(collection(db, 'products'), (snapshot) => {
      const prods = snapshot.docs.map(doc => doc.data() as Product);
      setDbProducts(prods);
      setLoading(false);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'products'));

    // 2. Fetch Certificates from Firestore
    const unsubCerts = onSnapshot(query(collection(db, 'certificates'), orderBy('id')), (snapshot) => {
      const certs = snapshot.docs.map(doc => doc.data());
      setDbCertificates(certs);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'certificates'));

    // 3. Fetch Dealers from Firestore
    const unsubDealers = onSnapshot(collection(db, 'dealers'), (snapshot) => {
      const dealers = snapshot.docs.map(doc => doc.data() as Dealer);
      setDbDealers(dealers);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'dealers'));

    // 4. Fetch Projects from Firestore
    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      const projs = snapshot.docs.map(doc => doc.data() as Project);
      setDbProjects(projs);
    }, (err) => handleFirestoreError(err, OperationType.LIST, 'projects'));

    // 5. Auth Listener
    const unsubAuth = auth.onAuthStateChanged((u) => {
      setUser(u);
      // Bootstrapped admin check
      setIsAdmin(u?.email === 'letuananhphuong20@gmail.com');
    });

    return () => {
      unsubProducts();
      unsubCerts();
      unsubDealers();
      unsubProjects();
      unsubAuth();
    };
  }, []);

  const mergedProducts = useMemo(() => {
    // Start with all hardcoded products
    const map = new Map<string, Product>();
    PRODUCTS.forEach(p => map.set(p.id, p));
    
    // Overlay database products
    dbProducts.forEach(dbP => {
      map.set(dbP.id, dbP);
    });
    
    return Array.from(map.values());
  }, [dbProducts]);

  const mergedProjectsData = useMemo(() => {
    const map = new Map<string, Project>();
    PROJECTS.forEach(p => map.set(p.id, p));
    
    dbProjects.forEach(dbProj => {
      map.set(dbProj.id, dbProj);
    });
    
    return Array.from(map.values());
  }, [dbProjects]);

  const handleLogin = async () => {
    if (isLoggingIn) return;
    try {
      setIsLoggingIn(true);
      await signInWithPopup(auth, googleProvider);
    } catch (error: any) {
      if (error.code !== 'auth/cancelled-popup-request' && error.code !== 'auth/popup-closed-by-user') {
        console.error('Login failed:', error);
        alert(lang === 'vi' ? 'Đăng nhập thất bại: ' + error.message : 'Login failed: ' + error.message);
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowAdminPanel(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleSaveProduct = async (product: Product) => {
    try {
      await setDoc(doc(db, 'products', product.id), product);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `products/${product.id}`);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa sản phẩm này?' : 'Are you sure you want to delete this product?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `products/${id}`);
    }
  };

  const handleSaveCertificate = async (cert: { id: string, title: string, imageUrl: string }) => {
    try {
      await setDoc(doc(db, 'certificates', cert.id), cert);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `certificates/${cert.id}`);
    }
  };

  const handleDeleteCertificate = async (id: string) => {
    if (!window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa giấy chứng nhận này?' : 'Are you sure you want to delete this certificate?')) return;
    try {
      await deleteDoc(doc(db, 'certificates', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `certificates/${id}`);
    }
  };

  const handleSaveDealer = async (dealer: Dealer) => {
    try {
      await setDoc(doc(db, 'dealers', dealer.id), dealer);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `dealers/${dealer.id}`);
    }
  };

  const handleDeleteDealer = async (id: string) => {
    if (!window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa đại lý này?' : 'Are you sure you want to delete this dealer?')) return;
    try {
      await deleteDoc(doc(db, 'dealers', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `dealers/${id}`);
    }
  };

  const handleSaveProject = async (project: Project) => {
    try {
      await setDoc(doc(db, 'projects', project.id), project);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `projects/${project.id}`);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!window.confirm(lang === 'vi' ? 'Bạn có chắc chắn muốn xóa dự án này?' : 'Are you sure you want to delete this project?')) return;
    try {
      await deleteDoc(doc(db, 'projects', id));
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, `projects/${id}`);
    }
  };

  // Estimator State
  const [area, setArea] = useState<number>(0);
  const [floors, setFloors] = useState<number>(1);
  const [calcStep, setCalcStep] = useState<number>(1);
  const [projType, setProjType] = useState<'wall' | 'floor' | 'industrial' | 'traffic'>('wall');
  const [surfaceType, setSurfaceType] = useState<'interior' | 'exterior'>('interior');
  const [houseType, setHouseType] = useState<'tube' | 'town' | 'l4_ceil' | 'l4_simple' | 'villa'>('town');
  const [wallCondition, setWallCondition] = useState<'new' | 'repaint'>('new');
  const [qualityTier, setQualityTier] = useState<'economic' | 'premium' | 'super'>('premium');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [thickness, setThickness] = useState<number>(1.0); // mm for epoxy
  const [selectedColorRange, setSelectedColorRange] = useState<string>(COLOR_PRICES[lang][0].range);
  const [selectedColorCode, setSelectedColorCode] = useState<string>('');
  const [colorStep, setColorStep] = useState<'chart' | 'group'>('chart');
  const [includeLabor, setIncludeLabor] = useState<boolean>(false);
  const [showAreaHelp, setShowAreaHelp] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const parsePrice = (priceStr: string | undefined): number => {
    if (!priceStr) return 0;
    // Remove both dots and commas (Vietnam uses both interchangeably in some contexts)
    return parseInt(priceStr.replace(/[.,]/g, '')) || 0;
  };

  const estimation = useMemo(() => {
    if (area <= 0) return null;

    if (projType === 'wall') {
      // 1. Calculate Real Surface Area based on K-factors
      let realArea = area;
      if (surfaceType === 'interior') {
        const k = (CALC_CONSTANTS.K_INTERIOR as any)[houseType] || 4.0;
        realArea = area * floors * k;
      } else {
        const k = (CALC_CONSTANTS.K_EXTERIOR as any)[houseType === 'villa' ? 'villa' : 'standard'] || 1.5;
        realArea = area * k;
      }

      // 2. Select Products based on Tier and Surface
      const allProducts = PRICE_LIST.flatMap(c => c.items);
      
      const chosenPutty = wallCondition === 'new' ? allProducts.find(i => i.type === 'putty' && i.surface === surfaceType) : null;
      
      let chosenPrimer: any;
      if (qualityTier === 'economic') {
        chosenPrimer = allProducts.find(i => i.id === 'G6.6' || (i.type === 'primer' && i.surface === surfaceType));
      } else if (qualityTier === 'super') {
        chosenPrimer = allProducts.find(i => i.id === 'G6.7' || i.id === 'G6.4');
      } else {
        chosenPrimer = allProducts.find(i => i.type === 'primer' && i.surface === surfaceType);
      }

      const chosenTopcoat = selectedProduct 
        ? allProducts.find(i => i.id === selectedProduct.id) 
        : (allProducts.find(i => i.type === 'topcoat' && i.surface === surfaceType && i.tier === qualityTier) 
           || allProducts.find(i => i.type === 'topcoat' && i.surface === surfaceType));

      // 3. Bucket Logic
      const calculateBuckets = (totalLiters: number, p18: number, p5: number, p1: number) => {
        const n18 = Math.floor(totalLiters / 18);
        let remaining = totalLiters % 18;
        const n5_ceil = Math.ceil(remaining / 5);
        
        let res: { n18: number, n5: number, n1: number, cost: number };
        
        if (n18 + 1 >= 1 && (totalLiters > 0) && (n18 + 1) * p18 < (n18 * p18 + n5_ceil * p5)) {
          res = { n18: n18 + 1, n5: 0, n1: 0, cost: (n18 + 1) * p18 };
        } else {
          const calculatedN5 = Math.floor(remaining / 5);
          const n1 = Math.ceil(remaining % 5);
          res = { n18, n5: calculatedN5, n1, cost: (n18 * p18 + calculatedN5 * p5 + n1 * p1) };
        }

        const formatted = [
          res.n18 > 0 ? `${res.n18} Thùng 18L` : '',
          res.n5 > 0 ? `${res.n5} Lon 5L` : '',
          res.n1 > 0 ? `${res.n1} Lon 1L` : ''
        ].filter(Boolean).join(' + ') || '0';

        return { ...res, formatted };
      };

      const colorInfo = COLOR_PRICES[lang].find((c: any) => c.range === selectedColorRange);
      const colorP18 = colorInfo ? parsePrice(colorInfo[surfaceType].l18) : 0;
      const colorP5 = colorInfo ? parsePrice(colorInfo[surfaceType].l5) : 0;
      const colorP1 = colorInfo ? parsePrice(colorInfo[surfaceType].l1) : 0;

      let puttyCost = 0;
      let puttyBags = 0;
      let puttyWeight = 0;
      if (chosenPutty) {
        puttyWeight = realArea * (chosenPutty?.coverageValue || 1.25);
        puttyBags = Math.ceil(puttyWeight / 40);
        puttyCost = puttyBags * (chosenPutty?.priceValue || 359000);
      }

      const primerLiters = realArea / (chosenPrimer?.coverageValue || 12);
      const primerBuckets = calculateBuckets(primerLiters, 
        allProducts.find(i => i.id === chosenPrimer?.id && i.unit.includes('18L'))?.priceValue || (chosenPrimer?.priceValue || 0),
        allProducts.find(i => i.id === chosenPrimer?.id && i.unit.includes('5L'))?.priceValue || (chosenPrimer?.priceValue * 0.3 || 0),
        allProducts.find(i => i.id === chosenPrimer?.id && i.unit.includes('1L'))?.priceValue || (chosenPrimer?.priceValue * 0.1 || 0)
      );

      const topcoatLitersTotal = (realArea / (chosenTopcoat?.coverageValue || 12)) * (wallCondition === 'new' ? 2 : 2.2);
      const tBaseP18 = allProducts.find(i => i.id === chosenTopcoat?.id && i.unit.includes('18L'))?.priceValue || (chosenTopcoat?.priceValue || 0);
      const tBaseP5 = allProducts.find(i => i.id === chosenTopcoat?.id && i.unit.includes('5L'))?.priceValue || (chosenTopcoat?.priceValue * 0.3 || 0);
      const tBaseP1 = allProducts.find(i => i.id === chosenTopcoat?.id && i.unit.includes('1L'))?.priceValue || (chosenTopcoat?.priceValue * 0.1 || 0);

      const topcoatBuckets = calculateBuckets(topcoatLitersTotal, tBaseP18 + colorP18, tBaseP5 + colorP5, tBaseP1 + colorP1);
      const laborCost = includeLabor ? realArea * (surfaceType === 'interior' ? CALC_CONSTANTS.LABOR.interior : CALC_CONSTANTS.LABOR.exterior) : 0;

      return {
        realArea,
        items: [
          { name: chosenPutty?.name[lang], qty: puttyBags, unit: 'Bao (40kg)', cost: puttyCost },
          { name: chosenPrimer?.name[lang], qty: primerBuckets.formatted, unit: '-', cost: primerBuckets.cost },
          { name: chosenTopcoat?.name[lang], qty: topcoatBuckets.formatted, unit: '-', cost: topcoatBuckets.cost }
        ].filter(i => i.name),
        labor: laborCost,
        total: puttyCost + primerBuckets.cost + topcoatBuckets.cost + laborCost
      };
    } else {
      // Epoxy, Industrial, Traffic
      if (!selectedProduct) return null;
      
      let amountNeeded = 0;
      let unit = 'Kg';
      
      if (projType === 'floor' && selectedProduct.id === 'G.6') {
        amountNeeded = area * thickness * 1.5;
      } else {
        const coverageStr = selectedProduct.coverage || '10';
        const coverageVal = parseFloat(coverageStr.split('-')[0]) || 10;
        amountNeeded = area / coverageVal;
        unit = (selectedProduct.id.includes('G5') || selectedProduct.id.includes('G.18') || selectedProduct.id.includes('G.19')) ? 'Lít' : 'Kg';
      }
      
      const totalPrice = parsePrice(selectedProduct.price);
      // Assume basic pack is 20kg/18L for calculation if single price provided, or use as total for the needed amount if it's per set
      const pricePerUnit = totalPrice / 20; 
      const cost = Math.round(amountNeeded * pricePerUnit);
      const laborCost = includeLabor ? area * 35000 : 0;
      
      return {
        realArea: area,
        items: [
          { name: selectedProduct.name, qty: Math.round(amountNeeded * 10) / 10, unit: unit, cost: cost }
        ],
        labor: laborCost,
        total: cost + laborCost
      };
    }
  }, [area, floors, projType, surfaceType, houseType, qualityTier, selectedProduct, thickness, selectedColorRange, includeLabor, lang, wallCondition]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return mergedProducts;
    return mergedProducts.filter(p => p.category === activeCategory);
  }, [activeCategory, mergedProducts]);

  const categories = [
    { id: 'all', label: lang === 'vi' ? 'Tất cả' : 'All' },
    { id: 'primer', label: lang === 'vi' ? 'Sơn lót' : 'Primer' },
    { id: 'topcoat', label: lang === 'vi' ? 'Sơn phủ' : 'Topcoat' },
    { id: 'waterproof', label: lang === 'vi' ? 'Chống thấm' : 'Waterproof' },
    { id: 'putty', label: lang === 'vi' ? 'Bột bả' : 'Putty' },
    { id: 'epoxy', label: lang === 'vi' ? 'Sơn Epoxy' : 'Epoxy' },
    { id: 'industrial', label: lang === 'vi' ? 'Công nghiệp' : 'Industrial' },
    { id: 'traffic', label: lang === 'vi' ? 'Giao thông' : 'Traffic' },
  ];

  if (showAdminPanel && isAdmin) {
    return (
       <div className="fixed inset-0 z-[9999] bg-brand-light flex flex-col font-sans overflow-hidden">
         {/* Admin Header */}
         <div className="bg-white border-b border-brand-charcoal/5 p-6 flex justify-between items-center shrink-0">
           <div className="flex items-center gap-4">
              <div className="bg-brand-green p-3 rounded-2xl text-white">
                <Settings size={24} />
              </div>
              <div>
                <h1 className="text-xl font-black text-brand-charcoal uppercase tracking-widest">Admin Dashboard</h1>
                <p className="text-xs text-brand-charcoal/40 font-bold uppercase tracking-widest">AIG GROUP - G9ECO</p>
              </div>
           </div>
           <div className="flex items-center gap-4">
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-charcoal text-white text-[10px] font-black uppercase tracking-widest hover:bg-red-500 transition-all font-sans"
              >
                <LogOut size={16} /> Logout
              </button>
              <button 
                onClick={() => setShowAdminPanel(false)}
                className="p-3 bg-brand-charcoal/5 rounded-2xl hover:bg-brand-charcoal/10 transition-all text-brand-charcoal"
              >
                <X size={24} />
              </button>
           </div>
         </div>
         
         <div className="flex-1 overflow-y-auto p-8 md:p-16">
            <div className="max-w-7xl mx-auto space-y-24">
               {/* 1. Products Management */}
               <section>
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
                   <div>
                     <h2 className="text-4xl font-black text-brand-charcoal mb-2 tracking-tight">Quản lý Sản phẩm</h2>
                     <p className="text-sm text-brand-charcoal/40 font-medium tracking-wide">Cập nhật hình ảnh, giá và thông tin kỹ thuật</p>
                   </div>
                   <div className="flex flex-wrap gap-4">
                     <button 
                       onClick={async () => {
                         if (!window.confirm('Bạn có muốn nhập dữ liệu mẫu HOÀN TOÀN (Ghi đè nếu trùng ID) vào hệ thống không?')) return;
                         let count = 0;
                         for (const p of PRODUCTS) {
                           await handleSaveProduct(p);
                           count++;
                         }
                         alert(`Đã nhập xong ${count} sản phẩm mẫu!`);
                       }}
                       className="bg-brand-charcoal text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all"
                     >
                       <Save size={18} /> Phục hồi dữ liệu mẫu
                     </button>
                     <button 
                       onClick={() => {
                          const id = prompt('Nhập mã sản phẩm mới (VD: G9-PRO):');
                          if (!id) return;
                          const newProd: Product = {
                            id,
                            name: 'Sản phẩm mới G9ECO',
                            category: 'topcoat',
                            description: { vi: 'Mô tả sản phẩm...', en: 'Description...' },
                            features: { vi: ['Tính năng 1'], en: ['Feature 1'] },
                            image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80',
                            coverage: '12-14 m2/lít',
                            dryingTime: { vi: '2 giờ', en: '2 hours' },
                            price: 'Liên hệ'
                          };
                          handleSaveProduct(newProd);
                       }}
                       className="bg-brand-green text-white px-8 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-brand-green/20"
                     >
                       <Plus size={20} /> Thêm sản phẩm
                     </button>
                   </div>
                 </div>

                 {/* Admin Category Tabs */}
                 <div className="flex flex-wrap gap-2 mb-8 bg-white p-2 rounded-3xl border border-brand-charcoal/5 shadow-sm">
                   {categories.map(cat => (
                     <button
                       key={cat.id}
                       onClick={() => setActiveCategory(cat.id)}
                       className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${
                         activeCategory === cat.id 
                           ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' 
                           : 'text-brand-charcoal/40 hover:bg-brand-charcoal/5'
                       }`}
                     >
                       {cat.label}
                     </button>
                   ))}
                   <div className="ml-auto px-4 py-3 text-[10px] font-black text-brand-green uppercase tracking-widest bg-brand-green/5 rounded-2xl">
                     Tổng: {filteredProducts.length} SP
                   </div>
                 </div>
                 
                 <div className="grid lg:grid-cols-2 gap-8">
                    {filteredProducts.map(p => (
                       <AdminProductItem key={p.id} product={p} onSave={handleSaveProduct} onDelete={handleDeleteProduct} lang={lang} />
                    ))}
                 </div>
                 {filteredProducts.length === 0 && (
                   <div className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-brand-charcoal/10">
                      <PaintBucket size={48} className="mx-auto text-brand-charcoal/10 mb-4" />
                      <p className="text-brand-charcoal/40 font-black uppercase tracking-widest text-sm">Không tìm thấy sản phẩm nào trong mục này</p>
                   </div>
                 )}
               </section>

               {/* 2. Certificates Management */}
               <section>
                 <div className="flex justify-between items-end mb-12">
                   <div>
                     <h2 className="text-4xl font-black text-brand-charcoal mb-2 tracking-tight">Giấy chứng nhận</h2>
                     <p className="text-sm text-brand-charcoal/40 font-medium tracking-wide">Quản lý các hồ sơ năng lực và chứng thực chất lượng</p>
                   </div>
                   <button 
                     onClick={() => {
                       const id = 'cert-' + Date.now();
                       handleSaveCertificate({ id, title: 'Giấy chứng nhận mới', imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80' });
                     }}
                     className="bg-brand-green text-white px-8 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-brand-green/20"
                   >
                     <Plus size={20} /> Thêm chứng nhận
                   </button>
                 </div>
                 <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                   {dbCertificates.map(c => (
                     <AdminCertItem key={c.id} cert={c} onSave={handleSaveCertificate} onDelete={handleDeleteCertificate} />
                   ))}
                 </div>
               </section>

               {/* 3. Dealers Management */}
               <section>
                 <div className="flex justify-between items-end mb-12">
                   <div>
                     <h2 className="text-4xl font-black text-brand-charcoal mb-2 tracking-tight">Hệ thống Đại lý</h2>
                     <p className="text-sm text-brand-charcoal/40 font-medium tracking-wide">Quản lý mạng lưới phân phối 3 miền</p>
                   </div>
                   <div className="flex gap-4">
                     {dbDealers.length === 0 && (
                       <button 
                         onClick={async () => {
                           if (!window.confirm('Bạn có muốn nhập danh sách đại lý mẫu không?')) return;
                           const sampleDealers: Dealer[] = [
                             { id: 'd1', name: 'Đại lý G9ECO Hà Nội', region: 'North', address: '164 Khuất Duy Tiến, Thanh Xuân, Hà Nội', phone: '0967.894.400' },
                             { id: 'd2', name: 'Đại lý G9ECO Hải Phòng', region: 'North', address: 'Số 12 Lạch Tray, Ngô Quyền, Hải Phòng', phone: '0967.894.400' },
                             { id: 'd3', name: 'Đại lý G9ECO Đà Nẵng', region: 'Central', address: '456 Nguyễn Văn Linh, Đà Nẵng', phone: '0967.894.400' },
                             { id: 'd4', name: 'Đại lý G9ECO Hà Tĩnh', region: 'Central', address: '158 Hàm Nghi, TP. Hà Tĩnh', phone: '0967.894.400' },
                             { id: 'd5', name: 'Đại lý G9ECO TP.HCM', region: 'South', address: '04 Nguyễn Đình Chiểu, Quận 1, TP.HCM', phone: '0967.894.400' },
                             { id: 'd6', name: 'Đại lý G9ECO Cần Thơ', region: 'South', address: '789 Đường 3/2, Ninh Kiều, Cần Thơ', phone: '0967.894.400' },
                           ];
                           for (const d of sampleDealers) {
                             await handleSaveDealer(d);
                           }
                           alert('Đã nhập thành công!');
                         }}
                         className="bg-brand-charcoal text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all"
                       >
                         <Save size={18} /> Nhập dữ liệu mẫu
                       </button>
                     )}
                     <button 
                       onClick={() => {
                          const id = 'dl-' + Date.now();
                          handleSaveDealer({ 
                            id, 
                            name: 'Đại lý mới', 
                            region: 'North', 
                            address: 'Số...', 
                            phone: '0...' 
                          });
                       }}
                       className="bg-brand-green text-white px-8 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-brand-green/20"
                     >
                       <Plus size={20} /> Thêm đại lý
                     </button>
                   </div>
                 </div>
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                   {dbDealers.map(d => (
                     <AdminDealerItem key={d.id} dealer={d} onSave={handleSaveDealer} onDelete={handleDeleteDealer} />
                   ))}
                 </div>
               </section>

               {/* 4. Projects Management */}
               <section>
                 <div className="flex justify-between items-end mb-12">
                   <div>
                     <h2 className="text-4xl font-black text-brand-charcoal mb-2 tracking-tight">Quản lý Dự án</h2>
                     <p className="text-sm text-brand-charcoal/40 font-medium tracking-wide">Cập nhật hình ảnh và thông tin dự án tiêu biểu</p>
                   </div>
                   <div className="flex gap-4">
                     {dbProjects.length === 0 && (
                       <button 
                         onClick={async () => {
                           if (!window.confirm('Bạn có muốn nhập dữ liệu dự án mẫu vào hệ thống không?')) return;
                           for (const p of PROJECTS) {
                             await handleSaveProject(p);
                           }
                           alert('Đã nhập thành công!');
                         }}
                         className="bg-brand-charcoal text-white px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-black transition-all"
                       >
                         <Save size={18} /> Nhập dữ liệu mẫu
                       </button>
                     )}
                     <button 
                       onClick={() => {
                          const id = 'pj-' + Date.now();
                          handleSaveProject({ 
                            id, 
                            name: 'Dự án mới G9ECO', 
                            type: { vi: 'Hạng mục dự án', en: 'Project Type' },
                            image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop'
                          });
                       }}
                       className="bg-brand-green text-white px-8 py-5 rounded-3xl text-[10px] font-black uppercase tracking-widest flex items-center gap-3 shadow-xl shadow-brand-green/20"
                     >
                       <Plus size={20} /> Thêm dự án
                     </button>
                   </div>
                 </div>
                 
                 <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {mergedProjectsData.map(p => (
                       <AdminProjectItem key={p.id} project={p} onSave={handleSaveProject} onDelete={handleDeleteProject} />
                    ))}
                 </div>
               </section>
            </div>
         </div>
       </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-light bg-dots-pattern">
      {/* Professional Sticky Nav */}
      <nav className="fixed top-0 left-0 w-full z-[100] px-4 py-4 md:px-6 md:py-6 transition-all duration-500">
        <div className="max-w-7xl mx-auto glass-card rounded-[2rem] md:rounded-[2.5rem] h-16 md:h-20 px-6 md:px-10 flex items-center justify-between border border-white/40 shadow-2xl relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-brand-accent/5 via-transparent to-brand-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="flex items-center gap-2 sm:gap-6 relative z-10">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-green organic-radius flex items-center justify-center text-white font-black text-lg sm:text-xl shadow-lg shadow-brand-green/30 shrink-0"
            >
              G9
            </motion.div>
            <div className="flex items-center gap-2 sm:gap-3">
              <img 
                src="https://i.imgur.com/wWBJMgc.jpeg" 
                alt="G9 ECO Icon" 
                className="w-10 h-10 sm:w-12 sm:h-12 object-contain rounded-full border-2 border-brand-green/20 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-display font-black tracking-tight flex items-center">
                  <span className="text-brand-green">G9</span>
                  <span className="text-brand-charcoal">ECO</span>
                </span>
                <span className="text-[6px] sm:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-brand-green font-black">{t.footerSlogan}</span>
              </div>
            </div>
          </div>
          
          <div className="hidden md:flex space-x-10 items-center relative z-10">
            {NAV_LINKS.map((link) => (
              <a 
                key={link.id} 
                href={link.href} 
                className="text-xs font-black uppercase tracking-widest text-brand-charcoal/60 hover:text-brand-accent transition-all relative group/link"
              >
                {t[link.id as keyof typeof t]}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-accent group-hover/link:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4 relative z-10">
            {!user && (
              <button 
                onClick={handleLogin}
                disabled={isLoggingIn}
                className={`p-3 text-brand-charcoal/40 hover:text-brand-green transition-all group ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
                title="Staff Login"
              >
                {isLoggingIn ? (
                  <div className="w-5 h-5 border-2 border-brand-green border-t-transparent rounded-full animate-spin" />
                ) : (
                  <LogIn size={20} className="group-hover:scale-110 transition-transform" />
                )}
              </button>
            )}
            {isAdmin && (
              <button 
                onClick={() => setShowAdminPanel(true)}
                className="flex items-center gap-3 px-5 h-11 glass-card rounded-xl border border-white/60 hover:border-brand-accent hover:bg-brand-accent/5 transition-all group/admin shadow-xl shadow-black/5"
                title="Quản trị hệ thống"
              >
                <div className="w-7 h-7 bg-brand-accent/10 rounded-lg flex items-center justify-center text-brand-accent group-hover/admin:bg-brand-accent group-hover/admin:text-white transition-all duration-500">
                  <Settings size={16} className="group-hover/admin:rotate-90 transition-transform duration-700" />
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] hidden lg:block text-brand-charcoal/60 group-hover/admin:text-brand-accent transition-colors">Quản trị AI</span>
              </button>
            )}
            <div className="flex bg-brand-charcoal/5 p-1 rounded-xl">
              <button 
                onClick={() => setLang('vi')}
                className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${lang === 'vi' ? 'bg-white text-brand-green shadow-md' : 'text-brand-charcoal/40'}`}
              >
                VI
              </button>
              <button 
                onClick={() => setLang('en')}
                className={`px-4 py-1.5 text-[10px] font-black rounded-lg transition-all ${lang === 'en' ? 'bg-white text-brand-green shadow-md' : 'text-brand-charcoal/40'}`}
              >
                EN
              </button>
            </div>
            <button 
              className="md:hidden p-3 text-brand-charcoal bg-brand-charcoal/5 rounded-xl hover:bg-brand-green/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Mobile menu overlay */}
        <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95, y: -20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -20 }}
                  className="absolute top-full left-0 w-full mt-4 bg-white/95 backdrop-blur-3xl p-10 rounded-[3rem] shadow-2xl border border-white flex flex-col items-center space-y-8"
                >
                  {NAV_LINKS.map((link) => (
                    <a 
                      key={link.id} 
                      href={link.href} 
                      className="text-2xl font-serif font-black text-brand-charcoal hover:text-brand-green transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t[link.id as keyof typeof t]}
                    </a>
                  ))}
                  <button className="w-full btn-primary text-sm py-6">{t.contact}</button>
                </motion.div>
              )}
        </AnimatePresence>
      </nav>

      <main>
        {/* Immersive 2026 Hero */}
        <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-brand-light bg-grid-pattern">
          {/* Background Vector Accents - Blueprint Style */}
          <div className="absolute inset-0 opacity-[0.02] pointer-events-none z-0">
            <svg width="100%" height="100%" viewBox="0 0 1440 800" fill="none" preserveAspectRatio="xMidYMid slice">
              <path d="M-100 400C200 600 600 100 800 300C1000 500 1300 200 1500 400" stroke="currentColor" strokeWidth="2" />
              <circle cx="200" cy="200" r="100" stroke="currentColor" strokeWidth="1" />
              <rect x="1000" y="50" width="300" height="300" stroke="currentColor" strokeWidth="1" transform="rotate(15 1150 200)" />
              <line x1="0" y1="0" x2="1440" y2="800" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 10" />
            </svg>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-brand-accent/5 skew-x-[-12deg] translate-x-1/4 pointer-events-none" />
          
          {/* Animated Blobs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div 
              animate={{ 
                x: [0, 50, 0],
                y: [0, 100, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -top-[10%] -left-[10%] w-[60vw] h-[60vw] bg-brand-accent/5 rounded-full blur-[120px]" 
            />
            <motion.div 
              animate={{ 
                x: [0, -80, 0],
                y: [0, -50, 0],
                scale: [1.2, 1, 1.2]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-[0%] -right-[10%] w-[50vw] h-[50vw] bg-brand-gold/10 rounded-full blur-[100px]" 
            />
          </div>

          <div className="absolute inset-0 z-0">
             <motion.div 
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="h-full w-full"
             >
                <img 
                  src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e01a?q=80&w=2070&auto=format&fit=crop" 
                  alt="Sustainable Architecture 2026" 
                  className="w-full h-full object-cover opacity-20 grayscale brightness-125"
                  referrerPolicy="no-referrer"
                />
             </motion.div>
             <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-brand-light/95 to-brand-accent/5" />
          </div>

          <div className="section-container relative z-10 w-full pt-20">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: 0.3 }}
              >
                  <div className="inline-flex items-center gap-4 bg-white shadow-xl px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-12 border border-brand-green/20">
                    <span className="flex gap-2">
                      <div className="w-2 h-2 bg-brand-green rounded-full animate-ping" />
                      <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-brand-gold rounded-full animate-bounce" />
                    </span>
                    {t.heroSub}
                  </div>
                <div className="relative group">
                  <div className="absolute -top-6 -left-6 w-12 h-12 border-t-2 border-l-2 border-brand-accent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b-2 border-r-2 border-brand-accent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display leading-[0.8] mb-12 sm:mb-20 font-black tracking-tighter uppercase relative">
                    <span className="text-brand-green inline-block">G9</span>
                    <span className="text-brand-charcoal italic inline-block">ECO</span><br />
                    <span className="text-xl sm:text-2xl md:text-4xl lg:text-5xl text-brand-green font-display tracking-tight block mt-12 sm:mt-16 opacity-90">{t.heroTitle}</span>
                  </h1>
                </div>
                  <p className="text-lg md:text-2xl text-brand-charcoal/50 mb-16 leading-relaxed font-medium max-w-2xl">
                    {t.heroDesc}
                  </p>
                  <div className="flex flex-wrap gap-10 items-center">
                    <button className="btn-primary flex items-center gap-6 group relative overflow-hidden">
                      <span className="relative z-10 flex items-center gap-6">
                        {t.btnExplore} <ArrowRight size={22} className="group-hover:translate-x-3 transition-transform duration-500" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-brand-accent to-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.5em] text-brand-charcoal/30 mb-2">Exclusive Series</span>
                      <span className="text-sm font-black text-brand-accent underline underline-offset-8 decoration-2 decoration-brand-accent/30">Bio-Tech Colors 2026</span>
                    </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                className="relative hidden lg:block"
              >
                <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl border-8 border-white group/hero-img cursor-zoom-in" onClick={() => setSelectedZoomImage("https://i.imgur.com/OedyCAB.jpeg")}>
                  <img 
                    src="https://i.imgur.com/OedyCAB.jpeg" 
                    alt="G9 ECO Premium Product" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Floating Tech Badges */}
                  <div className="absolute top-10 right-10 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/50 animate-bounce-slow">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center text-white">
                        <Zap size={20} />
                      </div>
                      <div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-brand-charcoal/40">Technology</div>
                        <div className="text-xs font-black text-brand-charcoal">NANO 4.0</div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute bottom-10 left-10 bg-brand-green/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-white/20">
                     <div className="flex items-center gap-4">
                        <div className="text-white">
                           <div className="text-[8px] font-black uppercase tracking-widest opacity-60">Durability</div>
                           <div className="text-xl font-black">20+ YEARS</div>
                        </div>
                     </div>
                  </div>
                </div>
                
                {/* Decorative background elements behind image */}
                <div className="absolute -top-12 -right-12 w-64 h-64 bg-brand-gold/10 rounded-full blur-3xl -z-10" />
                <div className="absolute -bottom-12 -left-12 w-80 h-80 bg-brand-accent/10 rounded-full blur-3xl -z-10" />
              </motion.div>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:flex flex-col gap-24 items-center">
            {[ 
              { icon: Leaf, label: 'Bio-Based' },
              { icon: Zap, label: 'Smart Nano' },
              { icon: Globe, label: 'Eco-System' }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + i*0.2 }}
                className="flex flex-col items-center gap-4 group cursor-help"
              >
                <div className="w-16 h-16 rounded-full border border-brand-charcoal/10 flex items-center justify-center text-brand-charcoal/20 group-hover:border-brand-green group-hover:text-brand-green transition-all shadow-inner">
                  <item.icon size={24} />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-charcoal/20 vertical-text">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Story Section - Balanced Grid */}
        <section id="story" className="py-24 md:py-48 bg-white relative overflow-hidden bg-vector-pattern">
          {/* Decorative Vector Texture */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <svg width="100%" height="100%">
              <pattern id="dotpattern" width="60" height="60" patternUnits="userSpaceOnUse">
                <circle cx="30" cy="30" r="1.5" fill="currentColor" />
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#dotpattern)" />
            </svg>
          </div>
          
          {/* Bio-Tech Geometric Illustrations */}
          <div className="absolute top-40 left-10 opacity-[0.08] pointer-events-none hidden xl:block">
            <svg width="200" height="200" viewBox="0 0 200 200">
               <circle cx="100" cy="100" r="80" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" fill="none" />
               <path d="M100 20 L100 180 M20 100 L180 100" stroke="currentColor" strokeWidth="1" />
               <motion.circle 
                 animate={{ r: [30, 40, 30] }}
                 transition={{ duration: 4, repeat: Infinity }}
                 cx="100" cy="100" r="30" fill="currentColor" opacity="0.2" 
               />
            </svg>
          </div>
          <div className="absolute bottom-40 right-10 opacity-[0.08] pointer-events-none hidden xl:block">
            <svg width="240" height="240" viewBox="0 0 240 240">
               <rect x="40" y="40" width="160" height="160" stroke="currentColor" strokeWidth="1" transform="rotate(45 120 120)" fill="none" />
               <path d="M40 40 L200 200 M200 40 L40 200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="10 5" />
               <motion.rect 
                 animate={{ scale: [0.8, 1, 0.8], rotate: [0, 90, 0] }}
                 transition={{ duration: 8, repeat: Infinity }}
                 x="100" y="100" width="40" height="40" fill="currentColor" opacity="0.2" 
               />
            </svg>
          </div>
          {/* Floating Crosses */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-brand-accent/20 font-light text-2xl"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  rotate: 360,
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 20 + Math.random() * 10,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                +
              </motion.div>
            ))}
          </div>
          <div className="absolute top-0 right-1/4 w-[60vw] h-[60vw] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
          <div className="section-container relative z-10">
            <div className="text-center mb-32 max-w-4xl mx-auto relative">
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 text-[10rem] md:text-[20rem] font-black text-stroke-brand pointer-events-none select-none -z-10 opacity-20 font-display">G9</div>
              <span className="text-brand-accent font-black tracking-[0.5em] uppercase text-xs mb-8 block opacity-80">{t.visionSub}</span>
              <h1 className="section-title mb-10">
                <span className="gradient-text">{t.visionTitle}</span>
              </h1>
              <p className="text-xl md:text-3xl text-brand-charcoal/70 leading-relaxed font-medium">
                {t.visionDesc}
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12 mb-40 max-w-6xl mx-auto">
              {CRITERIA_9[lang].map((item: any, i: number) => {
                const borderColors = [
                  'border-emerald-500', 'border-amber-500', 'border-blue-500', 
                  'border-rose-500', 'border-green-500', 'border-indigo-500', 
                  'border-pink-500', 'border-orange-500', 'border-teal-500'
                ];
                const bgGradients = [
                  'from-emerald-50', 'from-amber-50', 'from-blue-50', 
                  'from-rose-50', 'from-green-50', 'from-indigo-50', 
                  'from-pink-50', 'from-orange-50', 'from-teal-50'
                ];
                const textColors = [
                  'text-emerald-600', 'text-amber-600', 'text-blue-600', 
                  'text-rose-600', 'text-green-600', 'text-indigo-600', 
                  'text-pink-600', 'text-orange-600', 'text-teal-600'
                ];
                return (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -15, scale: 1.02 }}
                    key={item.id} 
                    className={`bg-white p-10 md:p-12 rounded-[3rem] text-left border-l-8 ${borderColors[i]} flex flex-col items-start justify-center transition-all duration-500 shadow-2xl hover:shadow-brand-accent/10 relative overflow-hidden group`}
                  >
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${bgGradients[i]} to-transparent opacity-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 duration-700`} />
                    <div className={`text-4xl md:text-6xl font-sans font-black mb-4 tracking-tighter ${textColors[i]} opacity-20 group-hover:opacity-100 transition-opacity`}>{item.id}</div>
                    <div className="text-xl md:text-2xl font-black uppercase tracking-tight text-brand-charcoal mb-3 group-hover:text-brand-accent transition-colors">{item.label}</div>
                    <div className="text-xs md:text-sm font-bold text-brand-charcoal uppercase tracking-[0.2em]">{item.detail}</div>
                  </motion.div>
                );
              })}
            </div>

            {/* Wavy Divider with decorative dots */}
            <div className="relative py-32 pointer-events-none overflow-hidden">
              <svg className="absolute top-1/2 left-0 w-full h-32 text-brand-green/5 fill-current -translate-y-1/2" viewBox="0 0 1440 320" preserveAspectRatio="none">
                <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
              </svg>
              
              <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-6 text-center">
                {[
                  { label: lang === 'vi' ? 'Dự án hoàn thành' : 'Completed Projects', value: '500+', sub: lang === 'vi' ? 'Trên toàn quốc' : 'Nationwide' },
                  { label: lang === 'vi' ? 'Sản phẩm chủ đạo' : 'Core Products', value: '25+', sub: lang === 'vi' ? 'Chứng nhận xanh' : 'Eco Certified' },
                  { label: lang === 'vi' ? 'Khách hàng hài lòng' : 'Happy Clients', value: '10K+', sub: lang === 'vi' ? 'Đánh giá 5 sao' : '5 Star Reviews' },
                  { label: lang === 'vi' ? 'Năm kinh nghiệm' : 'Years Experience', value: '20+', sub: lang === 'vi' ? 'Trong ngành sơn' : 'In Paint Industry' },
                ].map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="text-4xl font-black text-brand-green mb-2">{stat.value}</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal mb-1">{stat.label}</div>
                    <div className="text-[8px] font-bold text-brand-charcoal/60 uppercase tracking-widest">{stat.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="max-w-4xl mx-auto text-center mb-20 pointer-events-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-block px-8 py-4 rounded-full bg-brand-green/5 border border-brand-green/10 text-brand-green text-xs font-black uppercase tracking-[0.3em] mb-12"
              >
                {lang === 'vi' ? 'Giá Trị Trải Nghiệm Thực Tế' : 'Real-World Experience Value'}
              </motion.div>
              <h2 className="text-3xl md:text-5xl font-black text-brand-charcoal mb-8 leading-tight tracking-tight">
                {lang === 'vi' 
                  ? 'Bản lĩnh tiên phong trong công nghệ sơn bảo vệ môi trường' 
                  : 'Pioneer in eco-friendly protective paint technology'}
              </h2>
              <div className="w-24 h-1 bg-brand-green mx-auto rounded-full mb-12" />
            </div>

            {/* Project Showcase Neat Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-32 pointer-events-auto">
              {[
                "https://i.imgur.com/EBcwP6A.jpeg",
                "https://i.imgur.com/fqNWmFP.jpeg",
                "https://i.imgur.com/fvJ70lz.jpeg",
                "https://i.imgur.com/D4F9a8H.jpeg",
                "https://i.imgur.com/AtUfM7e.jpeg",
                "https://i.imgur.com/zEnz8Nb.jpeg",
                "https://i.imgur.com/wGav0xK.jpeg",
                "https://i.imgur.com/EMFPu2E.jpeg",
              ].map((url, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative aspect-[4/3] rounded-3xl overflow-hidden border-2 border-white shadow-xl cursor-zoom-in group bg-white"
                  onClick={() => setSelectedZoomImage(url)}
                >
                  <img 
                    src={url} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    alt={`G9ECO Project ${idx + 1}`}
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/90 shadow-xl flex items-center justify-center text-brand-green scale-75 group-hover:scale-100 transition-transform">
                      <Plus size={24} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-16 items-start mt-12 relative">
              {/* Decorative background element for the grid */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-green/[0.02] blur-[150px] rounded-full pointer-events-none" />
              
              <div className="space-y-12 relative z-10">
                <h3 className="text-3xl font-black text-brand-charcoal mb-8 border-l-4 border-brand-green pl-6">{t.featureTitle}</h3>
                {FEATURES_7[lang].slice(0, 3).map((f, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group pr-0 md:pr-12"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-black text-sm">{i+1}</div>
                      <h4 className="text-xl font-bold tracking-tight text-brand-charcoal leading-tight group-hover:text-brand-green transition-colors">{f}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="relative group flex justify-center z-10">
                <div className="absolute inset-0 bg-brand-green/10 rounded-full blur-[100px] scale-150 animate-pulse" />
                <div className="relative w-full aspect-square max-w-sm rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white rotate-3 group-hover:rotate-0 transition-all duration-700 cursor-zoom-in" onClick={() => setSelectedZoomImage("https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2070&auto=format&fit=crop")}>
                  <img 
                    src="https://images.unsplash.com/photo-1517581177682-a085bb7ffb15?q=80&w=2070&auto=format&fit=crop" 
                    className="w-full h-full object-cover" 
                    alt="Modern Architecture" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 to-transparent flex flex-col justify-end p-10">
                    <div className="text-3xl font-black text-white mb-2 italic font-display">Vì Cuộc Sống Xanh</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand-green font-display">Sơn G9ECO - AIG Group</div>
                  </div>
                </div>
              </div>

              <div className="space-y-12 relative z-10">
                <div className="h-0 md:h-10" />
                {FEATURES_7[lang].slice(3).map((f, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group pl-0 md:pl-12"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-black text-sm">{i+4}</div>
                      <h4 className="text-xl font-bold tracking-tight text-brand-charcoal leading-tight group-hover:text-brand-green transition-colors">{f}</h4>
                    </div>
                  </motion.div>
                ))}
                
                {/* Visual filler for the right column */}
                <div className="pt-8 border-t border-brand-charcoal/5 pl-12 hidden lg:block">
                  <div className="flex items-center gap-3 text-brand-green/40">
                    <ShieldCheck size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'vi' ? 'Tiêu chuẩn quốc tế AIG' : 'AIG International Standard'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* NEW CONTENT TO FILL SPACE: Technology Focus */}
            <div className="mt-40 grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-green/10 rounded-lg text-brand-green text-[10px] font-black uppercase tracking-widest">
                  <Cpu size={14} />
                  {lang === 'vi' ? 'Công nghệ Nano 4.0' : 'Nano 4.0 Technology'}
                </div>
                <h3 className="text-4xl font-black text-brand-charcoal leading-tight">
                  {lang === 'vi' 
                    ? 'Bảo vệ tối ưu, thách thức mọi khắc nghiệt' 
                    : 'Ultimate protection, defying all harshness'}
                </h3>
                <p className="text-brand-charcoal/80 leading-relaxed font-medium">
                  {lang === 'vi'
                    ? 'G9ECO ứng dụng các hạt nano siêu phân tử len lỏi và lấp đầy các khoảng hở bề mặt, tạo ra một lớp màng bảo vệ vững chắc chống lại tác động của tia UV, độ ẩm và nấm mốc.'
                    : 'G9ECO applies super-molecular nano particles that penetrate and fill surface gaps, creating a solid protective layer against UV rays, moisture, and mold.'}
                </p>
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { title: lang === 'vi' ? 'Chống UV' : 'UV Protection', desc: '99%' },
                    { title: lang === 'vi' ? 'Kháng khuẩn' : 'Anti-bacterial', desc: '99.9%' },
                    { title: lang === 'vi' ? 'Độ bền màu' : 'Color Durability', desc: '20+ Year' },
                    { title: lang === 'vi' ? 'Thân thiện' : 'Eco-friendly', desc: '0% VOCs' },
                  ].map((item, i) => (
                    <div key={i} className="border-l-2 border-brand-green/20 pl-4 py-2">
                      <div className="text-2xl font-black text-brand-green">{item.desc}</div>
                      <div className="text-[10px] font-black uppercase text-brand-charcoal tracking-wider">{item.title}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative p-6"
              >
                <div className="absolute inset-0 bg-brand-green/5 rounded-[3rem] rotate-3" />
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white cursor-zoom-in" onClick={() => setSelectedZoomImage("https://i.imgur.com/hQezqZK.jpeg")}>
                  <img 
                    src="https://i.imgur.com/hQezqZK.jpeg" 
                    className="w-full h-full object-cover"
                    alt="Technology"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 to-transparent flex items-end p-8">
                    <p className="text-white text-xs font-bold italic opacity-80">
                      {lang === 'vi' ? '*Hình ảnh thực tế từ phòng thí nghiệm G9ECO' : '*Actual images from G9ECO laboratory'}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Showcase Section */}
        <section id="products" className="py-32 md:py-60 bg-brand-light relative overflow-hidden bg-dots-pattern">
          {/* Subtle Blueprint Vectors - Enhanced */}
          <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="0" cy="0" r="40" stroke="currentColor" strokeWidth="0.05" fill="none" />
              <circle cx="100" cy="100" r="40" stroke="currentColor" strokeWidth="0.05" fill="none" />
              <path d="M 0 50 L 100 50 M 50 0 L 50 100" stroke="currentColor" strokeWidth="0.02" />
              <rect x="10" y="10" width="80" height="80" stroke="currentColor" strokeWidth="0.01" fill="none" strokeDasharray="1 1" />
            </svg>
          </div>
          <div className="section-container">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 sm:mb-24 md:mb-40 gap-8 lg:gap-16">
              <div className="max-w-3xl">
                <span className="text-brand-green font-black tracking-[0.6em] uppercase text-[10px] mb-8 block opacity-80">{t.footerVision}</span>
                <h2 className="section-title">
                  <span className="gradient-text">{t.productTitle}</span>
                </h2>
              </div>
              
              <div className="flex flex-wrap gap-4 glass-card p-4 rounded-[3.5rem] border border-white/60 shadow-xl">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`px-10 py-5 rounded-[2.5rem] text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-500 ${
                      activeCategory === cat.id 
                      ? 'bg-brand-green text-white shadow-2xl scale-105' 
                      : 'text-brand-charcoal/40 hover:text-brand-green hover:bg-brand-green/5'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-16">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, i) => (
                  <motion.div
                    layout
                    key={product.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-card rounded-[4rem] overflow-hidden group hover:shadow-2xl transition-all duration-700"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden m-4 rounded-[3rem] border border-white/20 cursor-zoom-in" onClick={() => setSelectedZoomImage(product.image)}>
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute top-8 left-8 bg-white/95 backdrop-blur px-6 py-2.5 rounded-2xl text-[10px] font-black text-brand-green shadow-xl uppercase tracking-[0.3em]">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-12 pt-6">
                      <h3 className="text-3xl font-black text-brand-charcoal mb-4 tracking-tight leading-snug font-display">{product.name}</h3>
                      <p className="text-sm text-brand-charcoal/60 mb-6 line-clamp-2 font-medium leading-relaxed">{product.description[lang]}</p>
                      
                      <div className="space-y-3 mb-10">
                        <div className="flex items-center gap-3 text-xs font-bold text-brand-charcoal/40">
                          <Droplets size={14} className="text-brand-green" />
                          <span>{t.coverage}: {product.coverage}</span>
                        </div>
                        {product.dryingTime && (
                          <div className="flex items-center gap-3 text-xs font-bold text-brand-charcoal/40">
                            <Clock size={14} className="text-brand-accent" />
                            <span>{t.dryingTime}: {product.dryingTime[lang]}</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center justify-between border-t border-brand-charcoal/5 pt-10">
                        <div className="flex flex-col gap-4">
                          <div className="bg-brand-light/90 px-6 py-4 rounded-[2rem] border border-brand-charcoal/5 group-hover:bg-brand-green group-hover:text-white transition-all duration-700">
                             <div className="text-[10px] font-black leading-none uppercase tracking-[0.2em] opacity-40 mb-2 group-hover:text-white/60">{t.priceUnit}</div>
                             <div className="text-2xl font-sans font-black text-brand-green tracking-tight group-hover:text-white uppercase">
                                {product.price === 'Liên hệ' ? t.contact : `${product.price}đ`}
                             </div>
                          </div>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.1, rotate: 15 }}
                          className="w-16 h-16 rounded-full bg-brand-charcoal text-white flex items-center justify-center hover:bg-brand-accent transition-all shadow-xl group-hover:shadow-brand-accent/50"
                        >
                          <ArrowUpRight size={24} />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section id="certificates" className="py-24 md:py-32 bg-white relative overflow-hidden">
          <div className="section-container">
            <div className="max-w-3xl mb-16 sm:mb-24">
              <span className="text-brand-green font-black tracking-[0.6em] uppercase text-[10px] mb-8 block">{lang === 'vi' ? 'Tiêu chuẩn & Chất lượng' : 'Standards & Quality'}</span>
              <h2 className="section-title">
                <span className="gradient-text">{lang === 'vi' ? 'Giấy chứng nhận' : 'Certificates'}</span>
              </h2>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
              {(dbCertificates.length > 0 ? dbCertificates : [
                { id: 'c1', title: 'Chứng nhận Chất lượng 1', imageUrl: 'https://i.imgur.com/3Qpf4d7.jpeg' },
                { id: 'c2', title: 'Chứng nhận Chất lượng 2', imageUrl: 'https://i.imgur.com/4LVcgJY.jpeg' },
                { id: 'c3', title: 'Chứng nhận Chất lượng 3', imageUrl: 'https://i.imgur.com/gqJLZm3.jpeg' },
                { id: 'c4', title: 'Chứng nhận Chất lượng 4', imageUrl: 'https://i.imgur.com/uyvgE1C.jpeg' },
                { id: 'c5', title: 'Chứng nhận Chất lượng 5', imageUrl: 'https://i.imgur.com/ghgkAYG.jpeg' },
              ]).map((cert, index) => (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative cursor-pointer"
                  onClick={() => setSelectedZoomImage(cert.imageUrl || cert.image)}
                >
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-brand-light shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 border border-brand-charcoal/10">
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-all duration-700" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-charcoal/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <div className="bg-white/95 p-4 rounded-full shadow-xl">
                          <ImageIcon size={24} className="text-brand-green" />
                       </div>
                    </div>
                  </div>
                  <h3 className="mt-6 text-sm font-black text-brand-charcoal text-center tracking-tight uppercase">{cert.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 2026 AI Dashboard section (Estimator) */}
        <section id="support" className="py-24 md:py-60 bg-[#0A0F1D] relative overflow-hidden text-white">
          <div className="absolute inset-0 pointer-events-none opacity-40">
             <div className="absolute -top-[20%] -left-[10%] w-[100vw] h-[100vw] bg-brand-green/20 blur-[150px] rounded-full animate-blob" />
             <div className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[80vw] bg-brand-accent/15 blur-[150px] rounded-full animate-blob animation-delay-4000" />
             {/* Tech Lines Decoration */}
             <svg className="absolute top-0 right-0 w-full h-full opacity-10" viewBox="0 0 100 100" preserveAspectRatio="none">
               <path d="M0 20 L100 20 M100 80 L0 80 M20 0 L20 100 M80 100 L80 0" stroke="white" strokeWidth="0.1" fill="none" />
               <circle cx="20" cy="20" r="0.5" fill="white" />
               <circle cx="80" cy="20" r="0.5" fill="white" />
               <circle cx="20" cy="80" r="0.5" fill="white" />
               <circle cx="80" cy="80" r="0.5" fill="white" />
             </svg>
             {/* Floating Particles */}
             <div className="absolute inset-0">
               {[...Array(10)].map((_, i) => (
                 <motion.div
                   key={i}
                   className="absolute bg-white/10 rounded-full"
                   style={{
                     width: Math.random() * 4 + 2,
                     height: Math.random() * 4 + 2,
                     top: `${Math.random() * 100}%`,
                     left: `${Math.random() * 100}%`,
                   }}
                   animate={{
                     y: [0, -30, 0],
                     opacity: [0.2, 0.5, 0.2],
                   }}
                   transition={{
                     duration: Math.random() * 5 + 5,
                     repeat: Infinity,
                     ease: "easeInOut",
                   }}
                 />
               ))}
             </div>
          </div>
          
          <div className="section-container relative z-10">
            <div className="text-center mb-32 max-w-4xl mx-auto">
               <div className="inline-flex items-center gap-4 bg-white/10 border border-white/20 px-8 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.5em] mb-12 shadow-2xl">
                  <Calculator size={20} className="text-brand-accent animate-spin-slow" /> {t.ecoPredictor}
               </div>
                 <h2 className="text-4xl sm:text-6xl md:text-8xl font-serif font-black leading-tight sm:leading-tight mb-12 tracking-tight uppercase relative">
                   {t.calcTitle}
                   <div className="absolute -bottom-4 left-0 w-32 h-1 bg-brand-accent animate-pulse" />
                 </h2>
               <p className="text-2xl text-white/50 leading-relaxed font-medium">
                  {t.calcDesc}
               </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="bg-white/5 backdrop-blur-3xl rounded-[5rem] border border-white/10 shadow-3xl overflow-hidden min-h-[700px] flex flex-col md:flex-row">
                
                {/* Left Sidebar - Steps */}
                <div className="w-full md:w-80 bg-white/5 p-6 md:p-12 border-r border-white/10 flex md:flex-col gap-4 md:gap-6 overflow-x-auto overflow-y-hidden md:overflow-y-auto scrollbar-none">
                  {[1, 2, 3, 4, 5].map(step => (
                    <button 
                      key={step}
                      onClick={() => setCalcStep(step)}
                      className={`flex items-center gap-4 md:gap-6 p-4 md:p-6 rounded-2xl md:rounded-3xl transition-all shrink-0 md:shrink ${calcStep === step ? 'bg-brand-accent text-white shadow-xl' : 'hover:bg-white/5 text-white/30'}`}
                    >
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-bold shrink-0 ${calcStep === step ? 'border-white bg-white/20' : 'border-white/10'}`}>
                        {step}
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest block md:block">
                        {(t as any)[`calcStep${step}`]}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Right Content */}
                <div className="flex-1 p-12 md:p-24 flex flex-col relative pb-32 md:pb-40">
                  <AnimatePresence mode="wait">
                    {calcStep === 1 && (
                      <motion.div 
                        key="step1"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full flex flex-col justify-center gap-12"
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                           {[
                             { id: 'wall', icon: Home, label: 'Tường nhà' },
                             { id: 'floor', icon: Building2, label: 'Sàn Epoxy' },
                             { id: 'industrial', icon: Zap, label: 'Công nghiệp' },
                             { id: 'traffic', icon: MapPin, label: 'Giao thông' }
                           ].map(type => (
                             <button
                               key={type.id}
                               onClick={() => setProjType(type.id as any)}
                               className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all ${projType === type.id ? 'border-brand-accent bg-brand-accent/10 text-white' : 'border-white/10 text-white/40 hover:bg-white/5'}`}
                             >
                               <type.icon size={24} />
                               <span className="text-[10px] font-black uppercase tracking-widest">{type.label}</span>
                             </button>
                           ))}
                        </div>

                        <div>
                          <div className="flex items-center gap-3 mb-6">
                            <label className="text-[10px] font-black uppercase tracking-[0.8em] text-brand-accent block">
                              {projType === 'wall' ? t.inputArea : (lang === 'vi' ? 'DIỆN TÍCH SỬ DỤNG' : 'USED AREA')}
                            </label>
                            <button 
                              onClick={() => setShowAreaHelp(!showAreaHelp)}
                              className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/30 hover:bg-brand-accent hover:text-white transition-all shadow-lg"
                            >
                              <Info size={14} />
                            </button>
                          </div>
                          
                          {showAreaHelp && (
                            <motion.div 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="mb-8 p-6 bg-brand-accent/20 rounded-2xl border border-brand-accent/30 backdrop-blur-md relative"
                            >
                              <div className="text-sm font-black text-white mb-2">{t.areaExplainTitle}</div>
                              <div className="text-[11px] font-medium text-white/70 leading-relaxed">{t.areaExplainDesc}</div>
                              <button onClick={() => setShowAreaHelp(false)} className="absolute top-4 right-4 text-white/40 hover:text-white"><X size={16} /></button>
                            </motion.div>
                          )}

                          <div className="relative mb-12 flex items-center">
                            <input 
                              type="number"
                              value={area || ''}
                              onChange={(e) => setArea(Number(e.target.value))}
                              placeholder="00"
                              className="bg-transparent border-b-8 border-white/10 py-6 sm:py-12 text-[3rem] sm:text-[8rem] md:text-[14rem] font-sans font-black text-white focus:outline-none focus:border-brand-accent transition-all w-full tracking-tight"
                            />
                            <span className="absolute right-0 bottom-8 sm:bottom-16 text-2xl sm:text-6xl font-black text-white/10 uppercase tracking-widest pointer-events-none">m²</span>
                          </div>

                          {/* Removing AI Photo Upload section as per user request */}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                           <button 
                             onClick={() => setWallCondition('new')}
                             className={`px-8 py-8 rounded-3xl border-2 transition-all text-left flex flex-col gap-3 ${wallCondition === 'new' ? 'border-brand-accent bg-brand-accent/10' : 'border-white/10 hover:bg-white/5'}`}
                           >
                             <span className="text-sm font-black uppercase tracking-widest">{t.wallNew.split(' (')[0]}</span>
                             <span className="text-[10px] text-white/50 leading-relaxed">{t.wallNew}</span>
                           </button>
                           <button 
                             onClick={() => setWallCondition('repaint')}
                             className={`px-8 py-8 rounded-3xl border-2 transition-all text-left flex flex-col gap-3 ${wallCondition === 'repaint' ? 'border-brand-accent bg-brand-accent/10' : 'border-white/10 hover:bg-white/5'}`}
                           >
                             <span className="text-sm font-black uppercase tracking-widest">{t.wallOld.split(' (')[0]}</span>
                             <span className="text-[10px] text-white/50 leading-relaxed">{t.wallOld}</span>
                           </button>
                        </div>

                        {surfaceType === 'interior' && (
                          <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 mt-12">
                             <label className="text-[10px] font-black uppercase tracking-[0.8em] text-brand-accent mb-6 block">{lang === 'vi' ? 'SỐ TẦNG' : 'FLOORS'}</label>
                             <div className="flex gap-4">
                               {[1, 2, 3, 4, 5].map(num => (
                                 <button 
                                   key={num}
                                   onClick={() => setFloors(num)}
                                   className={`w-20 h-20 rounded-2xl border-2 font-black text-2xl transition-all ${floors === num ? 'bg-brand-accent border-brand-accent' : 'border-white/10 hover:bg-white/5'}`}
                                 >
                                   {num}
                                 </button>
                               ))}
                               <input 
                                 type="number"
                                 value={floors > 5 ? floors : ''}
                                 onChange={(e) => setFloors(Number(e.target.value))}
                                 placeholder="+"
                                 className="w-20 h-20 bg-transparent rounded-2xl border-2 border-dashed border-white/20 text-center font-black text-2xl focus:outline-none focus:border-brand-accent"
                               />
                             </div>
                          </div>
                        )}
                      </motion.div>
                    )}

                    {calcStep === 2 && (
                      <motion.div 
                        key="step2"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full flex flex-col justify-center gap-10"
                      >
                         <label className="text-[10px] font-black uppercase tracking-[0.8em] text-brand-accent mb-2 block">
                            {projType === 'wall' ? t.chooseSurface : (lang === 'vi' ? 'CHỌN SẢN PHẨM CỤ THỂ' : 'SELECT SPECIFIC PRODUCT')}
                         </label>
                         
                         {projType === 'wall' ? (
                           <div className="grid grid-cols-2 gap-8">
                             {[
                               { id: 'interior', label: t.surfaceInterior, icon: <Home /> },
                               { id: 'exterior', label: t.surfaceExterior, icon: <Globe /> }
                             ].map(item => (
                               <button
                                 key={item.id}
                                 onClick={() => setSurfaceType(item.id as any)}
                                 className={`p-12 rounded-[4rem] border-2 flex flex-col items-center gap-6 transition-all ${surfaceType === item.id ? 'border-brand-accent bg-brand-accent/10' : 'border-white/10 hover:bg-white/5'}`}
                               >
                                 <div className={`w-20 h-20 rounded-full flex items-center justify-center ${surfaceType === item.id ? 'bg-brand-accent text-white' : 'bg-white/10 text-white/50'}`}>
                                   {React.cloneElement(item.icon as any, { size: 32 })}
                                 </div>
                                 <span className="text-xl font-black uppercase tracking-widest">{item.label}</span>
                               </button>
                             ))}
                           </div>
                         ) : (
                           <div className="space-y-6">
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[350px] overflow-y-auto pr-4 scrollbar-thin">
                                {PRODUCTS.filter(p => p.category === projType || (projType === 'floor' && p.category === 'epoxy')).map(product => (
                                  <button
                                    key={product.id}
                                    onClick={() => setSelectedProduct(product)}
                                    className={`p-6 rounded-3xl border-2 transition-all text-left flex flex-col gap-2 ${selectedProduct?.id === product.id ? 'border-brand-accent bg-brand-accent/10' : 'border-white/10 hover:bg-white/5'}`}
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="text-[10px] font-black text-brand-accent">{product.id}</div>
                                      {selectedProduct?.id === product.id && <Zap size={14} className="text-brand-accent" />}
                                    </div>
                                    <div className="text-sm font-black leading-tight truncate">{product.name}</div>
                                    <div className="text-[9px] text-white/40 line-clamp-2">{product.description[lang]}</div>
                                  </button>
                                ))}
                             </div>
                             
                             {projType === 'floor' && selectedProduct?.id === 'G.6' && (
                               <div className="animate-in fade-in slide-in-from-top-4 p-8 bg-white/5 rounded-[3rem] border border-white/10">
                                  <label className="text-[10px] font-black uppercase tracking-[0.8em] text-brand-gold mb-6 block">ĐỘ DÀY BỀ MẶT THI CÔNG (MM)</label>
                                  <div className="flex flex-wrap gap-4">
                                    {[1, 2, 3, 5].map(v => (
                                      <button
                                        key={v}
                                        onClick={() => setThickness(v)}
                                        className={`w-16 h-16 rounded-2xl border-2 font-black transition-all ${thickness === v ? 'bg-brand-gold border-brand-gold text-white' : 'border-white/10 hover:bg-white/5 text-white/40'}`}
                                      >
                                        {v}
                                      </button>
                                    ))}
                                    <div className="flex-1 min-w-[120px]">
                                       <input 
                                         type="number"
                                         value={thickness}
                                         onChange={(e) => setThickness(Number(e.target.value))}
                                         placeholder="Tùy chọn..."
                                         className="w-full h-16 bg-white/5 border-2 border-white/10 rounded-2xl px-6 font-black focus:outline-none focus:border-brand-gold text-white"
                                       />
                                    </div>
                                  </div>
                                  <p className="mt-4 text-[9px] font-medium text-white/30 italic">* Lưu ý: Với hệ sơn tự san phẳng G.6, độ dày màng sơn quyết định trực tiếp đến định mức vật tư (trung bình 1.5kg/m2 cho mỗi 1mm độ dày).</p>
                               </div>
                             )}
                           </div>
                         )}

                         {projType === 'wall' && (
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {(surfaceType === 'interior' ? [
                                { id: 'tube', label: t.houseTypeTube },
                                { id: 'town', label: t.houseTypeTown },
                                { id: 'l4_ceil', label: t.houseTypeL4Ceil },
                                { id: 'l4_simple', label: t.houseTypeL4Simple },
                              ] : [
                                { id: 'standard', label: t.houseTypeTown },
                                { id: 'villa', label: t.houseTypeVilla },
                              ]).map(type => (
                                <button
                                  key={type.id}
                                  onClick={() => setHouseType(type.id as any)}
                                 className={`px-6 py-6 rounded-2xl border-2 text-[10px] font-black uppercase tracking-widest leading-normal transition-all ${houseType === type.id ? 'border-brand-accent bg-brand-accent text-white' : 'border-white/10 hover:bg-white/5'}`}
                                >
                                  {type.label}
                                </button>
                              ))}
                           </div>
                         )}
                      </motion.div>
                    )}

                    {calcStep === 3 && (
                      <motion.div 
                        key="step3"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full flex flex-col justify-center"
                      >
                        <h3 className="text-4xl font-sans font-black uppercase tracking-tight text-white mb-10 text-center">{t.calcStep3}</h3>
                        <div className="grid md:grid-cols-3 gap-6">
                          {[
                            { id: 'economic', label: t.tierEconomic, color: 'text-brand-green', desc: 'Bền màu - Tiết kiệm', products: 'G6.6 + G8.1/G8.7' },
                            { id: 'premium', label: t.tierPremium, color: 'text-brand-accent', desc: 'Sạch sẽ - Bóng đẹp', products: 'G6.5 + G8.2/G8.8' },
                            { id: 'super', label: t.tierSuper, color: 'text-brand-gold', desc: 'Đẳng cấp - Thượng hạng', products: 'G6.7 + G8.5/G8.9' }
                          ].map(tier => (
                            <button
                              key={tier.id}
                              onClick={() => setQualityTier(tier.id as any)}
                              className={`p-10 rounded-[3.5rem] border-2 transition-all text-left flex flex-col items-start gap-4 ${qualityTier === tier.id ? 'border-brand-accent bg-brand-accent/10' : 'border-white/10 hover:bg-white/5'}`}
                            >
                              <div className={`text-4xl font-black ${tier.id === qualityTier ? tier.color : 'text-white/20'}`}>0{tier.id === 'economic' ? 1 : tier.id === 'premium' ? 2 : 3}</div>
                              <div>
                                <span className="text-2xl font-black uppercase tracking-tight block">{tier.label}</span>
                                <span className="text-[10px] font-black uppercase text-white/30 tracking-widest">{tier.desc}</span>
                              </div>
                              <div className="mt-4 pt-4 border-t border-white/5 w-full">
                                <div className="text-[8px] font-black uppercase text-white/20 mb-2">HỆ THỐNG ĐỀ XUẤT:</div>
                                <div className="text-[10px] font-medium text-white/60">{tier.products}</div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {calcStep === 4 && (
                      <motion.div 
                        key="step4"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="h-full flex flex-col pt-4 overflow-hidden"
                      >
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                           <div>
                              <h3 className="text-4xl font-sans font-black uppercase tracking-tight text-white mb-2">{t.chooseColor}</h3>
                              <p className="text-white/40 text-[10px] font-medium uppercase tracking-[0.2em]">{t.chooseSpecificColor}</p>
                           </div>
                           <div className="flex bg-white/5 p-1.5 rounded-2xl border border-white/5">
                              <button 
                                onClick={() => setColorStep('chart')}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${colorStep === 'chart' ? 'bg-brand-accent text-white shadow-lg' : 'text-white/30 hover:text-white/60'}`}
                              >
                                {lang === 'vi' ? 'BẢNG MÀU' : 'COLOR CHART'}
                              </button>
                              <button 
                                onClick={() => setColorStep('group')}
                                className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${colorStep === 'group' ? 'bg-brand-accent text-white shadow-lg' : 'text-white/30 hover:text-white/60'}`}
                              >
                                {lang === 'vi' ? 'NHÓM PHỤ PHÍ' : 'PRICE GROUPS'}
                              </button>
                           </div>
                        </div>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0 pb-10">
                           {colorStep === 'chart' ? (
                             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 animate-in fade-in slide-in-from-bottom-4 duration-500">
                               {FAN_DECK.map((color, i) => (
                                 <button
                                   key={i}
                                   onClick={() => {
                                     setSelectedColorCode(color.code);
                                     setSelectedColorRange(color.group);
                                   } }
                                   className={`group relative flex flex-col aspect-square rounded-2xl border-2 transition-all p-1.5 ${selectedColorCode === color.code ? 'border-brand-accent scale-105 z-10' : 'border-white/5 hover:border-white/20'}`}
                                 >
                                   <div className="flex-1 rounded-xl shadow-inner mb-2" style={{ backgroundColor: color.hex }} />
                                   <div className="text-[7px] font-black uppercase tracking-tighter text-white/40 group-hover:text-white transition-colors">{color.code}</div>
                                   {selectedColorCode === color.code && (
                                     <div className="absolute inset-x-0 -bottom-2 flex justify-center">
                                       <div className="bg-brand-accent text-white px-2 py-0.5 rounded-full text-[6px] font-black uppercase tracking-widest">Picked</div>
                                     </div>
                                   )}
                                 </button>
                               ))}
                             </div>
                           ) : (
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-right-4 duration-500">
                               {COLOR_PRICES[lang].map((item: any, i: number) => (
                                 <button
                                   key={i}
                                   onClick={() => { setSelectedColorRange(item.range); }}
                                   className={`p-6 rounded-[2.5rem] border-2 flex items-center gap-6 transition-all text-left relative overflow-hidden group ${selectedColorRange === item.range ? 'border-brand-accent bg-brand-accent/10' : 'border-white/10 hover:bg-white/5'}`}
                                 >
                                   <div className="w-20 h-20 rounded-full border-2 border-white/20 shrink-0 shadow-xl" style={{ backgroundColor: item.color }} />
                                   <div className="flex-1">
                                     <span className={`text-[8px] font-black uppercase tracking-[0.3em] block mb-1 ${selectedColorRange === item.range ? 'text-brand-accent' : 'text-white/30'}`}>{item.range}</span>
                                     <span className="text-xl font-black block leading-tight mb-1">{item.name}</span>
                                     <span className="text-[10px] font-medium text-white/50 block leading-tight">{item.desc}</span>
                                   </div>
                                   <div className="text-right">
                                     <span className="text-[8px] font-black text-white/20 uppercase tracking-widest block mb-1">PHỤ PHÍ</span>
                                     <span className="text-lg font-black text-brand-accent">+{item[surfaceType].l18}đ</span>
                                   </div>
                                 </button>
                               ))}
                             </div>
                           )}
                        </div>
                      </motion.div>
                    )}

                    {calcStep === 5 && estimation && (
                      <motion.div 
                        key="step5"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="h-full flex flex-col pt-6"
                      >
                        {/* Summary Header */}
                        <div className="flex flex-col lg:flex-row gap-8 items-start mb-8">
                           <div className="flex-1 w-full bg-white/5 rounded-[2.5rem] p-8 border border-white/10 relative overflow-visible">
                              <div className="flex justify-between items-start mb-6">
                                <div>
                                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent block mb-2">{t.estTotal}</span>
                                  <div className="text-4xl sm:text-6xl font-black text-brand-green tracking-tight transition-all duration-500">
                                    {estimation.total.toLocaleString()}đ
                                  </div>
                                </div>
                                <button 
                                  onClick={handlePrint}
                                  className="px-6 py-4 bg-brand-accent rounded-2xl hover:bg-brand-accent/80 transition-all text-white flex items-center gap-3 shadow-xl print:hidden"
                                >
                                  <ExternalLink size={20} />
                                  <span className="text-[10px] font-black uppercase tracking-widest">{lang === 'vi' ? 'In Báo Giá PDF' : 'Export PDF'}</span>
                                </button>
                              </div>

                                  <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 border-t border-white/10">
                                    <div className="min-w-0">
                                      <div className="text-[7px] sm:text-[8px] font-black text-white/90 uppercase tracking-widest mb-1 truncate">{lang === 'vi' ? 'Diện tích sàn' : 'Floor Area'}</div>
                                      <div className="text-[10px] sm:text-lg font-bold truncate text-white">{area} m²</div>
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-[7px] sm:text-[8px] font-black text-brand-green uppercase tracking-widest mb-1 truncate">{lang === 'vi' ? 'Diện tích sơn thực tế' : 'Real Surface'}</div>
                                      <div className="text-[10px] sm:text-lg font-bold text-brand-green truncate">{estimation.realArea.toLocaleString()} m²</div>
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-[7px] sm:text-[8px] font-black text-white/90 uppercase tracking-widest mb-1 truncate">{lang === 'vi' ? 'Không gian' : 'Space'}</div>
                                      <div className="text-[10px] sm:text-lg font-bold truncate text-white">{surfaceType === 'interior' ? t.surfaceInterior : t.surfaceExterior}</div>
                                    </div>
                                    <div className="min-w-0">
                                      <div className="text-[7px] sm:text-[8px] font-black text-white/90 uppercase tracking-widest mb-1 truncate">{lang === 'vi' ? 'Loại hình' : 'Build Type'}</div>
                                      <div className="text-[10px] sm:text-lg font-bold truncate text-white">{t[`houseType${houseType.charAt(0).toUpperCase() + houseType.slice(1)}` as keyof typeof t] || houseType}</div>
                                    </div>
                                  </div>
                           </div>
                           
                           <div className="w-full lg:w-72 flex flex-col gap-4">
                              <div className="p-6 bg-brand-green/10 rounded-3xl border border-brand-green/20 flex items-center justify-between">
                                 <div>
                                    <div className="text-[9px] font-black text-brand-green uppercase tracking-widest mb-1">{lang === 'vi' ? 'Cấp độ vật tư' : 'Quality Tier'}</div>
                                    <div className="text-lg font-black uppercase tracking-tight text-white">
                                      {projType === 'wall' ? qualityTier : (selectedProduct?.id || 'Premium')}
                                    </div>
                                 </div>
                                 <ShieldCheck size={24} className="text-brand-green" />
                              </div>
                              
                              <div className="p-6 bg-brand-green/5 rounded-3xl border border-brand-green/10 flex flex-col gap-1">
                                 <div className="flex items-center justify-between">
                                    <div className="text-[9px] font-black text-brand-green uppercase tracking-widest leading-none">ƯU ĐÃI NHÀ PHÂN PHỐI</div>
                                    <ShieldCheck size={14} className="text-brand-green" />
                                 </div>
                                 <div className="text-sm font-bold text-brand-charcoal mt-1">
                                    {lang === 'vi' ? 'Chiết khấu cao + Thưởng tháng 5-15%' : 'High Discount + 5-15% Monthly Bonus'}
                                 </div>
                                 <div className="text-[8px] text-brand-charcoal/60 font-medium italic">Hỗ trợ máy pha màu 225Tr - Showroom - Biển bảng</div>
                              </div>

                              <motion.button 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-brand-green text-white py-6 rounded-3xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 shadow-xl hover:shadow-brand-green/40 transition-all"
                              >
                                {lang === 'vi' ? 'ĐẶT HÀNG NGAY' : 'ORDER NOW'} <ArrowRight size={16} />
                              </motion.button>
                           </div>
                        </div>

                        {/* Inventory Table (Dealer View Ready) */}
                        <div className="flex-1 bg-brand-charcoal/40 rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col mb-24">
                           <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white/60">{t.estDetails}</h3>
                              <span className="text-[10px] text-white/30 italic font-medium">{t.estNote}</span>
                           </div>
                           
                           <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
                              <div className="space-y-4">
                                {estimation.items.map((item: any, idx: number) => (
                                  <div key={idx} className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-white/5 rounded-2xl border border-white/5 hover:bg-white/10 transition-all group">
                                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-brand-green shrink-0">
                                      {idx === 0 ? <Zap size={20} /> : idx === 1 ? <Droplets size={20} /> : <PaintBucket size={20} />}
                                    </div>
                                    <div className="flex-1 text-center sm:text-left min-w-0">
                                      <h4 className="text-sm sm:text-base font-black text-white group-hover:text-brand-green transition-colors truncate">{item.name}</h4>
                                      <div className="text-[8px] sm:text-[9px] font-bold text-white/40 uppercase tracking-widest">{projType === 'wall' ? 'Wall System Component' : 'Specialized Product'}</div>
                                    </div>
                                    <div className="flex flex-row sm:grid sm:grid-cols-2 gap-4 sm:gap-8 items-center justify-between sm:justify-end text-right sm:min-w-[240px] w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                                      <div className="text-left sm:text-right">
                                        <div className="text-[8px] font-black text-white/80 uppercase tracking-widest">{lang === 'vi' ? 'Khối lượng' : 'Quantity'}</div>
                                        <div className="text-sm sm:text-lg font-black text-white">{item.qty} <span className="text-[10px] text-white/90 uppercase font-bold">{item.unit}</span></div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-[8px] font-black text-white/80 uppercase tracking-widest">{lang === 'vi' ? 'Chi phí dự kiến' : 'Est. Cost'}</div>
                                        <div className="text-sm sm:text-lg font-black text-brand-green">{item.cost.toLocaleString()}đ</div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                                
                                {includeLabor && (
                                  <div className="flex flex-col sm:flex-row items-center gap-6 p-6 bg-brand-accent/10 rounded-2xl border border-brand-accent/20 transition-all group">
                                    <div className="w-12 h-12 bg-brand-accent/20 rounded-xl flex items-center justify-center text-brand-accent shrink-0">
                                      <Zap size={20} />
                                    </div>
                                    <div className="flex-1 text-center sm:text-left min-w-0">
                                      <h4 className="text-sm sm:text-base font-black text-white">Chi phí thi công trọn gói</h4>
                                      <div className="text-[8px] sm:text-[9px] font-bold text-brand-accent/50 uppercase tracking-widest">Professional Labor Service</div>
                                    </div>
                                    <div className="flex flex-row sm:grid sm:grid-cols-2 gap-4 sm:gap-8 items-center justify-between sm:justify-end text-right sm:min-w-[240px] w-full sm:w-auto border-t sm:border-t-0 border-white/5 pt-4 sm:pt-0">
                                      <div className="text-left sm:text-right">
                                        <div className="text-[8px] font-black text-white/50 uppercase tracking-widest">{lang === 'vi' ? 'Diện tích' : 'Quantity'}</div>
                                        <div className="text-sm sm:text-lg font-black text-white">{estimation.realArea.toLocaleString()} <span className="text-[10px] text-white/60 uppercase font-bold">m²</span></div>
                                      </div>
                                      <div className="text-right">
                                        <div className="text-[8px] font-black text-white/50 uppercase tracking-widest">{lang === 'vi' ? 'Thành tiền' : 'Subtotal'}</div>
                                        <div className="text-sm sm:text-lg font-black text-brand-accent">{estimation.labor.toLocaleString()}đ</div>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                           </div>
                        </div>

                        {/* Hidden Print Section */}
                        <div id="print-section" className="hidden print:block print:fixed print:inset-0 print:bg-white print:text-black print:p-10 z-[200]">
                          <div className="border-b-4 border-emerald-600 pb-8 mb-10 flex justify-between items-end">
                            <div>
                              <h1 className="text-4xl font-black mb-2">BÁO GIÁ VẬT TƯ G9ECO</h1>
                              <p className="text-sm text-gray-500 italic">Thành viên AIG Group - Giải pháp sơn xanh bền vững</p>
                            </div>
                            <div className="text-right">
                              <p className="text-xs font-bold uppercase tracking-widest">Ngày báo giá</p>
                              <p className="text-lg font-black">{new Date().toLocaleDateString('vi-VN')}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-10 mb-12">
                            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100 text-black">
                              <h3 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-4 border-b border-emerald-100 pb-2">Thông tin công trình</h3>
                              <div className="space-y-3 text-sm">
                                <div className="flex justify-between"><span>Hạng mục:</span> <span className="font-bold uppercase text-black">{projType}</span></div>
                                <div className="flex justify-between"><span>Vị trí:</span> <span className="font-bold uppercase text-black">{surfaceType === 'interior' ? 'Trong nhà' : 'Ngoài trời'}</span></div>
                                <div className="flex justify-between"><span>Diện tích sàn:</span> <span className="font-bold text-black">{area} m²</span></div>
                                <div className="flex justify-between"><span>Tổng diện tích sơn:</span> <span className="font-bold text-emerald-600">{estimation.realArea.toLocaleString()} m²</span></div>
                                {projType === 'wall' && <div className="flex justify-between"><span>Chất lượng:</span> <span className="font-bold uppercase text-black">{qualityTier}</span></div>}
                              </div>
                            </div>
                            <div className="flex flex-col justify-center text-center p-6 border-2 border-emerald-600 rounded-3xl bg-emerald-50">
                              <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Tổng giá trị dự toán</h3>
                              <div className="text-5xl font-black text-emerald-600">{estimation.total.toLocaleString()}đ</div>
                              <p className="text-[10px] text-gray-400 mt-4 italic uppercase tracking-widest">Giá niêm yết chưa chiết khấu</p>
                            </div>
                          </div>

                          <table className="w-full text-left border-collapse mb-12 text-black">
                            <thead>
                              <tr className="bg-gray-100 uppercase text-[10px] font-black tracking-widest text-gray-600">
                                <th className="p-4 border border-gray-200">{t.pdfTableProduct}</th>
                                <th className="p-4 border border-gray-200">{t.pdfTableQty}</th>
                                <th className="p-4 border border-gray-200">{t.pdfTableUnit}</th>
                                <th className="p-4 border border-gray-200 text-right">{t.pdfTablePrice}</th>
                              </tr>
                            </thead>
                            <tbody className="text-sm">
                              {estimation.items.map((item: any, idx: number) => (
                                <tr key={idx}>
                                  <td className="p-4 border border-gray-200 font-bold text-black">{item.name}</td>
                                  <td className="p-4 border border-gray-200 text-black">{item.qty}</td>
                                  <td className="p-4 border border-gray-200 uppercase text-black">{item.unit}</td>
                                  <td className="p-4 border border-gray-200 text-right font-black text-black">{item.cost.toLocaleString()}đ</td>
                                </tr>
                              ))}
                              {includeLabor && (
                                <tr>
                                  <td className="p-4 border border-gray-200 font-bold text-black">Chi phí thi công trọn gói</td>
                                  <td className="p-4 border border-gray-200 text-black">{estimation.realArea.toLocaleString()}</td>
                                  <td className="p-4 border border-gray-200 font-bold text-black">m²</td>
                                  <td className="p-4 border border-gray-200 text-right font-black text-black">{estimation.labor.toLocaleString()}đ</td>
                                </tr>
                              )}
                            </tbody>
                            <tfoot>
                              <tr className="bg-emerald-600 text-white font-black">
                                <td colSpan={3} className="p-4 text-right uppercase tracking-[0.2em] text-xs">Tổng cộng</td>
                                <td className="p-4 text-right text-xl">{estimation.total.toLocaleString()}đ</td>
                              </tr>
                            </tfoot>
                          </table>

                          <div className="grid grid-cols-2 gap-10 text-[10px] text-gray-400 leading-relaxed">
                            <div>
                              <p className="font-bold text-gray-600 mb-2 uppercase">Lưu ý kỹ thuật:</p>
                              <ul className="list-disc pl-4 space-y-1">
                                <li>Độ ẩm tường trước khi sơn phải &lt; 16% (đo bằng máy đo độ ẩm Protimeter).</li>
                                <li>Bề mặt phải sạch, khô, không dính dầu mỡ hay bụi bẩn.</li>
                                <li>Số lớp sơn đề nghị: 02 lớp bả - 01 lớp lót - 02 lớp phủ màu.</li>
                              </ul>
                            </div>
                            <div>
                                <p className="font-bold text-gray-600 mb-2 uppercase">Liên hệ tư vấn:</p>
                                <p>Hotline: 0967.894.400 | Website: www.g9eco.com</p>
                                <p>Sơn G9ECO - Công nghệ 4.0 vì một tương lai xanh.</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}


                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center z-10 pt-8 border-t border-white/5">
                    {calcStep > 1 && (
                      <button 
                        onClick={() => setCalcStep(calcStep - 1)}
                        className="flex items-center gap-4 px-10 py-6 rounded-2xl bg-white/5 hover:bg-white/10 text-white transition-all group"
                      >
                        <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={18} />
                        <span className="text-xs font-black uppercase tracking-widest">{lang === 'vi' ? 'Quay lại' : 'Back'}</span>
                      </button>
                    )}
                    
                    {calcStep < 5 ? (
                      <button 
                        onClick={() => setCalcStep(calcStep + 1)}
                        className={`flex items-center gap-4 px-12 py-6 rounded-2xl bg-brand-accent text-white shadow-3xl hover:scale-105 transition-all group ml-auto ${calcStep === 1 ? 'w-full md:w-auto justify-center' : ''}`}
                      >
                        <span className="text-xs font-black uppercase tracking-widest">{lang === 'vi' ? 'Tiếp theo' : 'Next'}</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
                      </button>
                    ) : (
                      <button 
                        onClick={() => document.getElementById('partners')?.scrollIntoView({ behavior: 'smooth' })}
                        className="flex items-center gap-4 px-12 py-6 rounded-2xl bg-brand-green text-white shadow-3xl hover:scale-105 transition-all group ml-auto"
                      >
                        <span className="text-xs font-black uppercase tracking-widest">{lang === 'vi' ? 'Hợp tác Dealer' : 'Dealer Inquiry'}</span>
                        <ExternalLink size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners & Projects Section */}
        <DealerSection lang={lang} />
        <DealerNetwork lang={lang} />
        <section id="partners" className="py-40 bg-brand-light">
          <div className="section-container">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div>
                <span className="text-brand-accent font-black tracking-[0.6em] uppercase text-[10px] mb-8 block font-black">{t.partnerSub}</span>
                <h2 className="section-title">{t.partnerTitle}</h2>
                <p className="text-xl text-brand-charcoal/70 mb-16 leading-relaxed font-medium">
                  {t.partnerDesc}
                </p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-16">
                  {PARTNERS.map((item, i) => (
                    <motion.div whileHover={{ y: -5 }} key={i} className="p-6 border border-brand-charcoal/5 rounded-2xl bg-white flex flex-col items-center justify-center text-center">
                      <div className="text-brand-charcoal font-black text-sm mb-1">{item.name}</div>
                      <div className="text-brand-accent font-bold text-[8px] uppercase tracking-widest">{item.origin[lang]}</div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4">
                  {[
                    { title: lang === 'vi' ? 'Chiết khấu cố định ở mức cao trong ngành sơn' : 'High fixed discount in the industry', icon: <Palette size={20} /> },
                    { title: lang === 'vi' ? 'Thưởng tháng 5% – 15% - Thưởng năm 4% – 12%' : 'Monthly bonus 5%-15% - Annual 4%-12%', icon: <Zap size={20} /> },
                    { title: lang === 'vi' ? 'Du lịch nghỉ dưỡng trong & ngoài nước' : 'Domestic & International travel', icon: <Globe size={20} /> },
                    { title: lang === 'vi' ? 'Hỗ trợ Showroom, biển bảng & Công cụ Marketing' : 'Showroom, Signage & Marketing tools', icon: <Building2 size={20} /> },
                    { title: lang === 'vi' ? 'Hỗ trợ mượn máy pha màu trị giá 225tr' : 'Lend auto mixer (225M worth)', icon: <Cpu size={20} /> },
                    { title: lang === 'vi' ? 'Hỗ trợ phần mềm bán hàng & Truyền thông' : 'Sales software & Media support', icon: <Save size={20} /> },
                    { title: lang === 'vi' ? 'Hỗ trợ kỹ thuật & Vận chuyển Miễn phí' : 'Technical & Free shipping support', icon: <Droplets size={20} /> },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 p-6 border border-brand-charcoal/5 rounded-2xl bg-white">
                      <div className="w-12 h-12 bg-brand-green/10 rounded-xl flex items-center justify-center text-brand-green shrink-0">
                        {item.icon}
                      </div>
                      <span className="text-lg text-brand-charcoal font-bold">{item.title}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white p-12 md:p-16 rounded-[4rem] border border-brand-charcoal/5 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 rounded-full blur-[80px] -mr-32 -mt-32" />
                <h3 className="text-2xl font-black text-brand-charcoal mb-12 flex items-center gap-4 relative z-10">
                  <Building2 size={24} className="text-brand-green" /> {t.projectTitle}
                </h3>
                <div className="space-y-6 relative z-10 font-sans">
                  {mergedProjectsData.map((project, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex flex-col md:flex-row items-start md:items-center gap-6 py-6 border-b border-brand-charcoal/5 last:border-0"
                    >
                      <div 
                        className="w-24 h-24 md:w-32 md:h-20 shrink-0 rounded-2xl overflow-hidden bg-brand-light border border-brand-charcoal/5 group-hover:shadow-lg transition-all duration-500 cursor-zoom-in"
                        onClick={() => setSelectedZoomImage(project.image)}
                      >
                         <img 
                           src={project.image} 
                           alt={project.name} 
                           className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                           referrerPolicy="no-referrer"
                         />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] font-bold text-brand-accent uppercase tracking-widest mb-1">{project.type[lang]}</div>
                        <div className="text-xl font-black text-brand-charcoal group-hover:text-brand-green transition-colors">{project.name}</div>
                      </div>
                      <ArrowUpRight size={20} className="text-brand-charcoal/20 group-hover:text-brand-green transition-all" />
                    </motion.div>
                  ))}
                </div>
                <div className="mt-12 p-8 bg-brand-green text-white rounded-3xl flex items-center justify-between shadow-xl shadow-brand-green/30">
                  <div>
                     <div className="text-3xl font-black mb-1 italic">100+</div>
                     <div className="text-[10px] font-bold uppercase tracking-widest opacity-70">{t.projectCount}</div>
                  </div>
                  <button className="bg-white text-brand-green px-8 py-4 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-accent hover:text-white transition-all">{t.btnViewProfile}</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Dealers Section - 3 Region Layout */}
        <section id="dealers" className="py-32 md:py-48 bg-white relative overflow-hidden">
          <div className="section-container">
            <div className="max-w-3xl mb-24">
              <span className="text-brand-green font-black tracking-[0.6em] uppercase text-[10px] mb-8 block">{lang === 'vi' ? 'Mạng lưới phân phối' : 'Distribution Network'}</span>
              <h2 className="section-title">
                <span className="gradient-text">{lang === 'vi' ? 'Hệ thống đại lý 3 miền' : 'Dealer Network'}</span>
              </h2>
              <p className="text-xl text-brand-charcoal/60 font-medium leading-relaxed mt-8">
                {lang === 'vi' 
                  ? 'G9ECO tự hào đồng hành cùng đối tác trên khắp mọi miền tổ quốc, mang sản phẩm xanh chất lượng đến mọi công trình.' 
                  : 'G9ECO is proud to partner with distributors nationwide, bringing quality green products to every project.'}
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-12">
              {[
                { id: 'North', title: lang === 'vi' ? 'Miền Bắc' : 'Northern Vietnam', color: 'bg-brand-green' },
                { id: 'Central', title: lang === 'vi' ? 'Miền Trung' : 'Central Vietnam', color: 'bg-brand-accent' },
                { id: 'South', title: lang === 'vi' ? 'Miền Nam' : 'Southern Vietnam', color: 'bg-brand-gold' },
              ].map((region) => (
                <div key={region.id} className="glass-card rounded-[3rem] p-10 relative overflow-hidden group">
                  <div className={`absolute top-0 right-0 w-32 h-32 ${region.color} opacity-5 blur-[60px] group-hover:opacity-20 transition-opacity`} />
                  <div className="flex items-center gap-4 mb-10">
                    <div className={`w-3 h-3 rounded-full ${region.color} animate-pulse`} />
                    <h3 className="text-2xl font-black text-brand-charcoal tracking-tight">{region.title}</h3>
                  </div>
                  
                  <div className="space-y-8 max-h-[500px] overflow-y-auto pr-4 scrollbar-hide">
                    {dbDealers.filter(d => d.region === region.id).length > 0 ? (
                      dbDealers.filter(d => d.region === region.id).map((dealer) => (
                        <motion.div 
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          key={dealer.id} 
                          className="group/item pb-6 border-b border-brand-charcoal/5 last:border-0"
                        >
                          <h4 className="text-sm font-black text-brand-charcoal mb-3 uppercase tracking-tight group-hover/item:text-brand-green transition-colors">{dealer.name}</h4>
                          <div className="space-y-2">
                             <div className="flex items-start gap-3 text-[11px] text-brand-charcoal/50 leading-relaxed">
                                <MapPin size={14} className="shrink-0 text-brand-green" />
                                <span>{dealer.address}</span>
                             </div>
                             <div className="flex items-center gap-3 text-[11px] font-black text-brand-charcoal">
                                <Phone size={14} className="shrink-0 text-brand-accent" />
                                <span>{dealer.phone}</span>
                             </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="py-12 text-center">
                        <div className="w-12 h-12 bg-brand-light rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-charcoal/20">
                           <MapPin size={24} />
                        </div>
                        <p className="text-[10px] font-black uppercase text-brand-charcoal/30 tracking-widest">
                           {lang === 'vi' ? 'Đang cập nhật danh sách...' : 'Updating list...'}
                        </p>
                      </div>
                    )}
                  </div>

                  <button className="w-full mt-10 py-5 rounded-2xl border border-brand-charcoal/5 text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40 hover:bg-brand-charcoal hover:text-white transition-all shadow-sm">
                     {lang === 'vi' ? 'Đăng ký đại lý khu vực' : 'Apply for this region'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* 2026 Immersive Footer */}
      <footer className="bg-brand-charcoal text-white pt-80 pb-24 relative overflow-hidden">
        {/* Background Layer with high-end imagery */}
        <div className="absolute inset-0 z-0">
           <img 
             src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e01a?q=80&w=2070&auto=format&fit=crop" 
             className="w-full h-full object-cover opacity-20 grayscale brightness-50"
             alt="Background"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-brand-charcoal/80 to-transparent" />
        </div>

        <div className="absolute inset-0 pointer-events-none z-0">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180vw] h-[100vw] bg-brand-green/10 blur-[200px] rounded-full" />
           <div className="absolute bottom-0 left-0 p-20 opacity-[0.03] select-none font-serif italic text-[45vw] leading-none pointer-events-none">G9</div>
        </div>

        <div className="section-container relative z-10">
          <div className="grid lg:grid-cols-4 gap-32 mb-60 border-b border-white/5 pb-40">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-6 mb-16">
                <div className="w-20 h-20 bg-brand-green organic-radius flex items-center justify-center text-white font-black text-4xl shadow-2xl shadow-brand-green/40">G9</div>
                <div className="flex items-center gap-5">
                  <img 
                    src="https://i.imgur.com/wWBJMgc.jpeg" 
                    alt="G9 ECO Logo" 
                    className="w-16 h-16 object-contain rounded-full border-2 border-brand-green/20"
                  />
                  <div className="flex flex-col">
                    <span className="text-3xl font-black tracking-tight flex items-center">
                      <span className="text-brand-green">G9</span>
                      <span className="text-brand-charcoal">ECO</span>
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-brand-green font-black mb-1">{t.footerSlogan}</span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-brand-charcoal/40 font-bold">{t.footerSub}</span>
                  </div>
                </div>
              </div>
            <div className="space-y-4 text-white/40 font-semibold text-sm mb-16">
              <p className="text-white text-lg font-black mb-4">CTCP Quốc tế AIG - Thương hiệu Sơn G9ECO</p>
              <p className="flex items-start gap-4"><MapPin size={22} className="text-brand-green shrink-0" /> <span>{t.footerAddressHead} Tầng 8, Tòa nhà Licogi13, Số 164 Khuất Duy Tiến, Thanh Xuân, Hà Nội</span></p>
              <p className="flex items-start gap-4"><MapPin size={20} className="text-brand-accent shrink-0" /> <span>{t.footerCentralHead} Số 158 đường Hàm Nghi, Phường Thành Sen, TP. Hà Tĩnh</span></p>
              <p className="flex items-start gap-4"><MapPin size={20} className="text-brand-accent shrink-0" /> <span>{t.footerSouthHead} Tầng 19, Tòa nhà Indochina Park Tower, số 04 Nguyễn Đình Chiểu, Q.1, TP. HCM</span></p>
              <p className="flex items-center gap-4 mt-6"><Phone size={24} className="text-brand-green shrink-0" /> <span className="text-2xl text-white font-black">0967.894.400</span></p>
              <p className="flex items-center gap-4"><Mail size={18} className="text-brand-accent shrink-0" /> <span>g9ecopaint@gmail.com</span></p>
            </div>
              <div className="flex gap-8">
                {[Facebook, Instagram, Mail].map((Icon, i) => (
                  <motion.a 
                    whileHover={{ y: -8, scale: 1.1 }}
                    key={i} 
                    href="#" 
                    className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-brand-charcoal transition-all shadow-xl"
                  >
                    <Icon size={28} />
                  </motion.a>
                ))}
              </div>
            </div>

            {[
              { 
                title: 'Công nghệ', 
                links: ['Hệ Bio-Molecular', 'Khử khuẩn Nano-Zinc', 'Tự làm sạch Bio-Clean', 'Sơn Bio-Waterproof'] 
              },
              { 
                title: 'Hệ sinh thái', 
                links: ['Quy trình Net-Zero', 'Trạm nghiên cứu AI', 'Chứng nhận LEED 2026', 'Tuyển dụng nhân tài'] 
              },
              { 
                title: 'Kết nối', 
                links: ['Cloud Partner', 'Hỗ trợ kỹ thuật AR', 'Triển lãm Metaverse', 'Hệ thống Showroom'] 
              }
            ].map((col) => (
              <div key={col.title}>
                <h4 className="text-[11px] font-black uppercase tracking-[0.6em] text-white/20 mb-16">{col.title}</h4>
                <ul className="space-y-10">
                  {col.links.map((link) => (
                    <li key={link}><a href="#" className="text-3xl font-serif text-white/40 hover:text-brand-accent transition-all inline-block hover:translate-x-3 duration-500">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-[11px] font-black uppercase tracking-[0.5em] text-white/10">
            <p>© 2026 G9ECO - A FUTURE VISION BY AIG GROUP</p>
            <div className="flex gap-10 md:gap-20 items-center">
              <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white">Digital Privacy</a>
              <a href="#" className="hover:text-white transition-colors border-b border-transparent hover:border-white">Bio-Legal Center</a>
              {user ? (
                <button onClick={handleLogout} className="flex items-center gap-2 text-red-500 hover:text-white transition-colors uppercase tracking-[0.3em] font-black">
                  <LogOut size={14} /> Logout
                </button>
              ) : (
                <button onClick={handleLogin} className="flex items-center gap-2 text-brand-green hover:text-white transition-colors uppercase tracking-[0.3em] font-black">
                  <LogIn size={14} /> Staff Login
                </button>
              )}
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Contact Buttons */}
      <div className="fixed bottom-10 right-10 z-[60] flex flex-col gap-4 pointer-events-none">
        {/* Zalo Button */}
        <motion.a
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          href="https://zalo.me/0967894400"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-[0_4px_20px_rgba(59,130,246,0.5)] hover:shadow-blue-500/20 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse group-hover:scale-150 transition-transform duration-700" />
          <span className="text-[10px] font-black uppercase tracking-tight relative z-10">Zalo</span>
        </motion.a>

        {/* Call Button */}
        <motion.a
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.1 }}
          href="tel:0967894400"
          className="pointer-events-auto flex items-center justify-center w-16 h-16 bg-brand-green text-white rounded-full shadow-[0_4px_20px_rgba(22,163,74,0.5)] hover:shadow-brand-green/20 transition-all group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse group-hover:scale-150 transition-transform duration-700" />
          <Phone size={24} className="relative z-10" />
          
          {/* Ripple Effect */}
          <div className="absolute inset-0 bg-brand-green rounded-full -z-10 animate-ping opacity-20" />
        </motion.a>
        
        <div className="absolute right-20 top-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-brand-green/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden lg:block">
          <div className="text-[10px] font-black text-brand-green uppercase tracking-widest leading-none mb-1">Tư vấn ngay</div>
          <div className="text-sm font-bold text-brand-charcoal">0967.894.400</div>
        </div>
      </div>

      {/* Image Zoom Modal */}
      <AnimatePresence>
        {selectedZoomImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedZoomImage(null)}
            className="fixed inset-0 z-[100] bg-brand-charcoal/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10 cursor-zoom-out"
          >
            <motion.button
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors border border-white/10"
              onClick={() => setSelectedZoomImage(null)}
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedZoomImage}
                alt="Zoomed View"
                className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white/50 text-xs font-medium tracking-widest uppercase">
                {lang === 'vi' ? 'Nhấn bất kỳ đâu để thoát' : 'Click anywhere to exit'}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
