'use server';

import prisma from '@/lib/prisma';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { Plus, Trash2, Hash, Package, ReceiptText, Edit3, X, Database, ChevronDown } from 'lucide-react';
import Link from 'next/link';

export default async function Admin({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const session = await auth();
  if (!session || session.user?.role !== 'ADMIN') redirect('/');

  const resolvedParams = await searchParams;
  const editId = resolvedParams.edit;

  const products = await prisma.product.findMany();
  const orders = await prisma.order.findMany({ include: { orderItems: true } });

  const productToEdit = editId 
    ? products.find(p => p.id === editId) 
    : null;


const categories = ['MEN', 'WOMEN', 'ACCESSORIES'] as const;

  async function addProduct(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price')) * 100;
    const imageUrl = formData.get('imageUrl') as string;
    const category = formData.get('category') as string;

    await prisma.product.create({ data: { name, description, price, imageUrl, category } });
    revalidatePath('/admin');
  }

  async function editProduct(id: string, formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    const price = Number(formData.get('price')) * 100;
    const imageUrl = formData.get('imageUrl') as string;
    const category = formData.get('category') as string;

    await prisma.product.update({
      where: { id },
      data: { name, description, price, imageUrl, category }
    });
    
    revalidatePath('/admin');
    redirect('/admin'); 
  }

  async function deleteProduct(id: string) {
    'use server';
    await prisma.product.delete({ where: { id } });
    revalidatePath('/admin');
  }

  return (
    <div className="min-h-screen bg-white text-primary font-sans selection:bg-primary selection:text-white">
      <header className="border-b-2 border-primary p-8 md:px-12 flex justify-between items-end bg-neutral-50/50">
        <div className="space-y-1">
          <p className="text-[11px] font-mono font-bold uppercase tracking-[.5em] text-primary/60">
            System_Control
          </p>
          <h1 className="text-5xl md:text-6xl font-sans font-extrabold tracking-tighter uppercase leading-none">
            Manifest<span className="text-primary/50">_Manager</span>
          </h1>
        </div>
        <div className="text-right hidden md:block font-mono text-[11px] font-medium text-primary/60 leading-relaxed uppercase tracking-wider">
          SESSION: ACTIVE
          <br />
          LOC: ARCHIVE_ADMIN
        </div>
      </header>
      <main className="max-w-1450px mx-auto p-8 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <section className="lg:col-span-4">
          <div className="sticky top-28">
            <div className="flex items-center justify-between mb-8 group">
              <div className="flex items-center gap-3">
                <div
                  className={`w-2.5 h-2.5 ${
                    productToEdit ? "bg-black animate-pulse" : "bg-primary"
                  } group-hover:rotate-45 transition-all duration-500`}
                />
                <h2 className="text-sm font-black uppercase tracking-[.4em]">
                  {productToEdit ? "Update_Protocol" : "Entry_Protocol"}
                </h2>
              </div>
              {productToEdit && (
                <Link
                  href="/admin"
                  className="text-primary/40 hover:text-black transition-colors flex items-center gap-1 font-mono text-[10px] uppercase font-bold border-b border-primary/20"
                >
                  Abort <X size={14} />
                </Link>
              )}
            </div>

            <form
              action={
                productToEdit
                  ? editProduct.bind(null, productToEdit.id)
                  : addProduct
              }
              className={`flex flex-col gap-6 p-1 transition-all ${
                productToEdit ? "border-l-4 border-black pl-6" : ""
              }`}
            >
              <div className="space-y-5">
                {[
                  {
                    name: "name",
                    label: "PRODUCT_NAME",
                    type: "text",
                    val: productToEdit?.name,
                  },
                  {
                    name: "description",
                    label: "DESCRIPTION_VOID",
                    type: "text",
                    val: productToEdit?.description,
                  },
                  {
                    name: "price",
                    label: "UNIT_PRICE_NGN",
                    type: "number",
                    val: productToEdit ? productToEdit.price / 100 : "",
                  },
                  {
                    name: "imageUrl",
                    label: "IMAGE_URL",
                    type: "text",
                    val: productToEdit?.imageUrl,
                  },
                  {
                    name: "category",
                    label: "CATEGORY",
                    type: "select",
                    val: productToEdit?.category,
                  },
                ].map((field) => (
                  <div key={field.name} className="group relative">
                    <label className="text-[10px] font-mono font-bold text-primary/60 absolute -top-2.5 left-3 bg-white px-2 z-10 transition-colors group-focus-within:text-black tracking-widest uppercase">
                      {field.label}
                    </label>
                    {field.type === "select" ? (
          <div className="relative">
            <select
              name={field.name}
              required
              key={productToEdit?.id || 'new-entry'}
              defaultValue={field.val || ""}
              className="w-full bg-transparent border-2 border-primary/10 p-4 text-[13px] font-mono font-medium uppercase tracking-[.2em] focus:border-black focus:outline-none transition-all appearance-none cursor-pointer hover:border-primary/40 rounded-none"
            >
              <option value="" disabled className="text-primary/20">Select_Category_</option>
              {categories.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-primary">
                  {cat.replace(/_/g, ' ')}_
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-primary/40 group-focus-within:text-black">
              <ChevronDown size={14} strokeWidth={3} />
            </div>
          </div>
        ) : (
          <input
            name={field.name}
            type={field.type}
            required
            defaultValue={field.val}
            placeholder="..."
            className="w-full bg-transparent border-2 border-primary/10 p-4 text-[13px] font-mono font-medium uppercase tracking-widest focus:border-black focus:outline-none transition-all placeholder:text-primary/10 hover:border-primary/40"
          />
        )}
      </div>
    ))}
  </div>

              <div className="flex flex-col gap-3">
                <button
                  type="submit"
                  className={`py-6 px-8 text-[11px] font-black uppercase tracking-[.6em] transition-all flex items-center justify-center gap-3 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none ${
                    productToEdit
                      ? "bg-black text-white hover:bg-neutral-800"
                      : "bg-primary text-white hover:bg-black"
                  }`}
                >
                  {productToEdit ? (
                    <>
                      <Database className="w-4 h-4" /> Overwrite_Archive
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" /> Upload_To_Archive
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
        <section className="lg:col-span-8 space-y-16">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b-2 border-primary/20 pb-4">
              <div className="flex items-center gap-3">
                <Package className="w-5 h-5" />
                <h2 className="text-sm font-black uppercase tracking-[.4em]">
                  Live_Inventory
                </h2>
              </div>
              <span className="font-mono text-[11px] font-bold text-primary/60 tracking-widest uppercase">
                COUNT: {products.length}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-px bg-primary/20 border-2 border-primary/20">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`bg-white p-6 flex justify-between items-center group transition-all ${
                    editId === product.id
                      ? "bg-neutral-100 border-l-8 border-black shadow-inner"
                      : "hover:bg-neutral-50"
                  }`}
                >
                  <div className="flex items-center gap-8">
                    <span className="font-mono text-[11px] font-bold text-primary/30 tabular-nums uppercase tracking-tighter">
                      #{product.id.slice(-4)}
                    </span>
                    <div>
                      <p
                        className={`text-[13px] font-black uppercase tracking-[.2em] transition-all ${
                          editId === product.id ? "translate-x-2" : ""
                        }`}
                      >
                        {product.name}
                      </p>
                      <p className="text-[11px] font-mono font-bold text-primary/60 tracking-wider uppercase">
                        NGN {(product.price / 100).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/admin?edit=${product.id}`}
                      className={`p-3 transition-all border rounded-full ${
                        editId === product.id
                          ? "bg-black text-white border-black"
                          : "text-primary/60 hover:text-black border-transparent hover:border-primary/20"
                      }`}
                    >
                      <Edit3 className="w-4 h-4" />
                    </Link>
                    <form action={deleteProduct.bind(null, product.id)}>
                      <button
                        type="submit"
                        className="p-3 text-primary/60 hover:text-red-600 hover:bg-red-50 transition-all rounded-full border border-transparent hover:border-red-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-primary/20 pb-4">
              <ReceiptText className="w-5 h-5" />
              <h2 className="text-sm font-black uppercase tracking-[.4em]">
                Recent_Manifests
              </h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b-2 border-primary/10">
                    <th className="py-5 font-mono text-[11px] font-black text-primary/80 uppercase tracking-[.3em]">
                      Order_ID
                    </th>
                    <th className="py-5 font-mono text-[11px] font-black text-primary/80 uppercase tracking-[.3em] text-right">
                      Status_Code
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="group hover:bg-neutral-50 transition-colors"
                    >
                      <td colSpan={2} className="p-0">
                        <details className="group/details w-full">
                          <summary className="list-none cursor-pointer py-5 px-1 flex justify-between items-center outline-none">
                            <div className="font-mono text-[11px] font-medium text-primary/70 group-hover:text-black transition-colors flex items-center gap-3 uppercase">
                              <Hash className="w-3 h-3 opacity-60" />
                              <span className="tracking-tighter font-extrabold">
                                {order.id}
                              </span>
                              <span className="text-[9px] opacity-0 group-hover/details:opacity-100 transition-opacity ml-2 font-bold text-primary/40">
                                [ CLICK_TO_EXPAND ]
                              </span>
                            </div>

                            <span
                              className={`text-[10px] font-black uppercase px-3 py-1.5 tracking-tighter ${
                                order.paymentStatus === "PAID"
                                  ? "bg-green-100 text-green-900 border border-green-200"
                                  : "bg-primary text-white"
                              }`}
                            >
                              {order.paymentStatus}
                            </span>
                          </summary>
                          <div className="pb-8 px-8 pt-2 space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
                            <div className="border-l-2 border-primary/10 pl-6 py-2 space-y-3">
                              <p className="text-[10px] font-mono font-bold text-primary/40 uppercase tracking-widest">
                                Manifest_Items
                              </p>

                              {order.orderItems?.map(
                                (item: any, idx: number) => (
                                  <div
                                    key={idx}
                                    className="flex justify-between items-baseline group/item"
                                  >
                                    <div className="flex gap-4 items-baseline">
                                      <span className="text-[11px] font-mono text-primary/30">
                                        0{idx + 1}
                                      </span>
                                      <span className="text-[12px] font-black uppercase tracking-wider">
                                        Item_Ref_{item.productId.slice(4,12)}
                                      </span>
                                      <span className="text-[10px] font-mono font-bold text-primary/40 italic">
                                        x{item.quantity}
                                      </span>
                                    </div>
                                    <div className="h-px grow mx-4 border-b border-dotted border-primary/10" />
                                    <span className="text-[11px] font-mono font-bold text-primary/80">
                                      NGN {(item.price / 100).toLocaleString()}
                                    </span>
                                  </div>
                                )
                              )}

                              <div className="pt-4 mt-4 border-t border-primary/10 flex justify-between items-center">
                                <p className="text-[10px] font-mono font-black uppercase tracking-[.4em] text-primary/60">
                                  Total_Settlement
                                </p>
                                <p className="text-lg font-mono font-bold tracking-tighter">
                                  NGN{" "}
                                  {(order.totalAmount / 100).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </details>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}