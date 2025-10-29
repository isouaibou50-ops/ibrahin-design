"use client";
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const ACCENT = '#C5A34A';

function formatDate(ts) {
  if (!ts) return '';
  return new Date(ts).toLocaleString();
}

function StatusPill({ status }) {
  const map = {
    pending: { text: 'Pending', bg: 'bg-yellow-100', textColor: 'text-yellow-800' },
    confirmed: { text: 'Confirmed', bg: 'bg-blue-100', textColor: 'text-blue-800' },
    'in-production': { text: 'In production', bg: 'bg-indigo-100', textColor: 'text-indigo-800' },
    ready: { text: 'Ready', bg: 'bg-green-100', textColor: 'text-green-800' },
    shipped: { text: 'Shipped', bg: 'bg-purple-100', textColor: 'text-purple-800' },
    delivered: { text: 'Delivered', bg: 'bg-green-200', textColor: 'text-green-900' },
    cancelled: { text: 'Cancelled', bg: 'bg-red-100', textColor: 'text-red-800' },
  };
  const cfg = map[status] || { text: status, bg: 'bg-gray-100', textColor: 'text-gray-700' };
  return <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.textColor}`}>{cfg.text}</span>;
}

export default function UserDashboard({ initialUserId = 'user_demo_1' }) {
  const [tab, setTab] = useState('orders'); // 'orders' | 'custom'
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [showCreateCustom, setShowCreateCustom] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, [page]);

  async function fetchOrders() {
    setLoading(true);
    try {
      const res = await fetch(`/api/user/orders?userId=${encodeURIComponent(initialUserId)}&page=${page}&limit=20`);
      const json = await res.json();
      if (json?.success) {
        setOrders(json.orders || []);
      }
    } catch (err) {
      console.error('fetchOrders', err);
    } finally {
      setLoading(false);
    }
  }

  async function createCustomOrder(payload) {
    try {
      const res = await fetch('/api/user/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, userId: initialUserId, type: 'custom' }),
      });
      const js = await res.json();
      if (js.success) {
        setOrders((s) => [js.order, ...s]);
        setShowCreateCustom(false);
      }
    } catch (err) {
      console.error('createCustomOrder', err);
    }
  }

  async function updateOrderStatus(id, status) {
    try {
      const res = await fetch(`/api/user/orders/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const js = await res.json();
      if (js.success) {
        setOrders((s) => s.map((o) => (o.id === id ? js.order : o)));
        if (selectedOrder?.id === id) setSelectedOrder(js.order);
      }
    } catch (err) {
      console.error('updateOrderStatus', err);
    }
  }

  const shopOrders = useMemo(() => orders.filter((o) => o.type === 'shop'), [orders]);
  const customOrders = useMemo(() => orders.filter((o) => o.type === 'custom'), [orders]);

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl font-semibold">Your Orders</h1>
          <p className="text-sm text-gray-600 mt-1">Track shop purchases and custom tailoring requests from one place.</p>
        </header>

        <nav className="flex items-center gap-3 bg-gray-50 rounded-full p-1 w-full overflow-hidden">
          <button onClick={() => setTab('orders')} className={`flex-1 text-sm py-2 rounded-full ${tab === 'orders' ? 'bg-white shadow' : 'bg-transparent'}`}>Shop Orders</button>
          <button onClick={() => setTab('custom')} className={`flex-1 text-sm py-2 rounded-full ${tab === 'custom' ? 'bg-white shadow' : 'bg-transparent'}`}>Custom Requests</button>
          <button onClick={() => setShowCreateCustom(true)} className="ml-2 text-sm px-3 py-1 rounded-full bg-[${ACCENT}] text-white" style={{ background: ACCENT }}>New Custom</button>
        </nav>

        <section className="mt-6">
          {loading ? (
            <div className="space-y-3 animate-pulse">
              <div className="h-20 bg-gray-100 rounded" />
              <div className="h-20 bg-gray-100 rounded" />
            </div>
          ) : (
            <div className="space-y-3">
              {(tab === 'orders' ? shopOrders : customOrders).length === 0 ? (
                <div className="bg-white p-4 rounded shadow text-sm text-gray-600">No {tab === 'orders' ? 'shop' : 'custom'} orders found.</div>
              ) : (
                (tab === 'orders' ? shopOrders : customOrders).map((o) => (
                  <motion.article key={o.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-4 rounded-lg shadow-sm flex items-start gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-semibold text-gray-700">{o.type === 'shop' ? 'S' : 'C'}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="truncate">
                          <div className="font-medium text-sm truncate">{o.type === 'shop' ? (o.items?.[0]?.name || 'Shop order') : 'Custom tailoring'}</div>
                          <div className="text-xs text-gray-400">{formatDate(o.createdAt)} • {o.id}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <StatusPill status={o.status} />
                          <button onClick={() => setSelectedOrder(o)} className="text-xs text-gray-500">Details</button>
                        </div>
                      </div>
                      <div className="mt-2 text-sm text-gray-700">{o.notes || (o.items?.map(i => `${i.name} x${i.qty}`).join(', ') || '')}</div>
                    </div>
                  </motion.article>
                ))
              )}
            </div>
          )}
        </section>

        {/* Details drawer / modal */}
        {selectedOrder && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={() => setSelectedOrder(null)} />
            <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-full sm:max-w-2xl bg-white rounded-t-xl sm:rounded-xl p-4 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">Order {selectedOrder.id}</h3>
                  <div className="text-xs text-gray-500">{formatDate(selectedOrder.createdAt)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill status={selectedOrder.status} />
                </div>
              </div>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Details</h4>
                  <div className="mt-2 text-sm text-gray-700">
                    {selectedOrder.type === 'shop' ? (
                      <div>
                        {selectedOrder.items?.map((it) => (
                          <div key={it.productId} className="flex items-center justify-between py-2 border-b last:border-b-0">
                            <div className="truncate">{it.name}</div>
                            <div className="text-sm text-gray-600">R {it.price} x{it.qty}</div>
                          </div>
                        ))}
                        <div className="mt-3 font-semibold">Total: R {selectedOrder.total}</div>
                      </div>
                    ) : (
                      <div>
                        <div className="text-sm text-gray-600">Price estimate: {selectedOrder.priceEstimate ? `R ${selectedOrder.priceEstimate}` : 'TBD'}</div>
                        <div className="mt-2 text-sm text-gray-700">Notes: {selectedOrder.notes || '—'}</div>

                        <div className="mt-3">
                          <h5 className="text-sm font-medium">Measurements</h5>
                          <div className="mt-2 text-sm text-gray-700 space-y-1">
                            {selectedOrder.measurements ? Object.entries(selectedOrder.measurements).map(([k, v]) => (
                              <div key={k} className="flex items-center justify-between"><span className="capitalize text-gray-500">{k}</span><span>{v} cm</span></div>
                            )) : <div className="text-sm text-gray-400">No measurements provided</div>}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium text-gray-700">Tracking</h4>
                  <div className="mt-2 space-y-2">
                    {(selectedOrder.tracking || []).slice().reverse().map((t, i) => (
                      <div key={i} className="text-sm text-gray-700 bg-gray-50 p-2 rounded">{new Date(t.ts).toLocaleString()} — {t.status} {t.note ? `• ${t.note}` : ''}</div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {selectedOrder.status !== 'cancelled' && selectedOrder.status !== 'delivered' && (
                      <button onClick={() => updateOrderStatus(selectedOrder.id, 'cancelled')} className="flex-1 bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded">Cancel</button>
                    )}
                    {selectedOrder.status === 'ready' && (
                      <button onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')} className="flex-1 bg-indigo-50 border border-indigo-200 text-indigo-700 px-4 py-2 rounded">Mark shipped</button>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 text-right">
                <button onClick={() => setSelectedOrder(null)} className="px-4 py-2 rounded border">Close</button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Create custom modal */}
        {showCreateCustom && (
          <CreateCustomModal onClose={() => setShowCreateCustom(false)} onSubmit={createCustomOrder} />
        )}
      </div>
    </div>
  );
}

function CreateCustomModal({ onClose, onSubmit }) {
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState('');
  const [priceEstimate, setPriceEstimate] = useState('');
  const [images, setImages] = useState([]);
  const [measurements, setMeasurements] = useState({ chest: '', waist: '', hips: '', shoulder: '', sleeve: '', length: '' });

  function onPickFiles(ev) {
    const files = Array.from(ev.target.files || []);
    files.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImages((s) => [...s, e.target.result]);
      };
      reader.readAsDataURL(f);
    });
  }

  async function submit() {
    setLoading(true);
    try {
      // sanitize numeric fields
      const numeric = {};
      Object.entries(measurements).forEach(([k, v]) => {
        const parsed = Number(v);
        if (!isNaN(parsed)) numeric[k] = parsed;
      });

      await onSubmit({ measurements: numeric, images, notes, priceEstimate: priceEstimate ? Number(priceEstimate) : null });
    } catch (err) {
      console.error('create custom', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative w-full sm:max-w-2xl bg-white rounded-t-xl sm:rounded-xl p-4 sm:p-6">
        <h3 className="text-lg font-semibold">New Custom Order</h3>
        <p className="text-sm text-gray-500 mt-1">Provide measurements and photos — we’ll contact you with a quote.</p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-xs text-gray-500">Chest (cm)
            <input value={measurements.chest} onChange={(e) => setMeasurements((m) => ({ ...m, chest: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2 text-sm" inputMode="numeric" />
          </label>
          <label className="text-xs text-gray-500">Waist (cm)
            <input value={measurements.waist} onChange={(e) => setMeasurements((m) => ({ ...m, waist: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2 text-sm" inputMode="numeric" />
          </label>
          <label className="text-xs text-gray-500">Hips (cm)
            <input value={measurements.hips} onChange={(e) => setMeasurements((m) => ({ ...m, hips: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2 text-sm" inputMode="numeric" />
          </label>
          <label className="text-xs text-gray-500">Shoulder (cm)
            <input value={measurements.shoulder} onChange={(e) => setMeasurements((m) => ({ ...m, shoulder: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2 text-sm" inputMode="numeric" />
          </label>
          <label className="text-xs text-gray-500">Sleeve (cm)
            <input value={measurements.sleeve} onChange={(e) => setMeasurements((m) => ({ ...m, sleeve: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2 text-sm" inputMode="numeric" />
          </label>
          <label className="text-xs text-gray-500">Length (cm)
            <input value={measurements.length} onChange={(e) => setMeasurements((m) => ({ ...m, length: e.target.value }))} className="mt-1 w-full border rounded px-3 py-2 text-sm" inputMode="numeric" />
          </label>
        </div>

        <div className="mt-4">
          <label className="text-xs text-gray-500">Photos (1-2)
            <input type="file" accept="image/*" multiple onChange={onPickFiles} className="mt-2 w-full" />
          </label>

          <div className="mt-3 flex gap-2">
            {images.map((src, i) => (
              <div key={i} className="w-20 h-20 rounded overflow-hidden bg-gray-100 border">
                <img src={src} className="object-cover w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <label className="text-xs text-gray-500">Notes
            <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="mt-1 w-full border rounded px-3 py-2 text-sm" rows={3} />
          </label>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <input value={priceEstimate} onChange={(e) => setPriceEstimate(e.target.value)} placeholder="Price estimate (optional)" className="flex-1 border rounded px-3 py-2 text-sm" inputMode="numeric" />
          <button onClick={submit} disabled={loading} className="px-4 py-2 bg-[${ACCENT}] text-white rounded" style={{ background: ACCENT }}>{loading ? 'Creating...' : 'Create'}</button>
        </div>

        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
        </div>
      </motion.div>
    </div>
  );
}

/*
  NOTES & NEXT STEPS (production readiness):
  - Replace in-memory ORDERS with a real DB (Mongo / Postgres). Move seeding to a migration or fixture.
  - Protect API endpoints using Clerk (getAuth) or your auth of choice. Use userId from auth context.
  - For images: upload to a storage (Cloudinary, S3, Supabase storage) and store URLs in DB rather than base64.
  - Validate inputs server-side and add rate-limiting.
  - Add background jobs for order status changes, notifications (email / SMS), and payment handling.
*/
