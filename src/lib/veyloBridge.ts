export interface VeyloBridgeParams {
  ikmId?: string;
  ikmName?: string;
  productId?: string;
  productName?: string;
  fobPriceUsd?: number;
  hsCode?: string;
  buyerId?: string;
  buyerName?: string;
  buyerCountry?: string;
  roomId?: string;
}

export const VEYLO_BASE_URL = 'https://veylo-live.vercel.app/app';
export const VEYLO_CHAT_API_URL = 'https://veylo-live.vercel.app/app/api/trade-chat';

export function getVeyloRoomUrl(params: VeyloBridgeParams): string {
  const roomId = params.roomId || 'TEI2026';
  const baseUrl = `${VEYLO_BASE_URL}/rooms/${roomId}`;
  const search = new URLSearchParams();
  if (params.ikmId) search.set('ikmId', params.ikmId);
  if (params.ikmName) search.set('ikmName', params.ikmName);
  if (params.productId) search.set('productId', params.productId);
  if (params.productName) search.set('productName', params.productName);
  if (params.fobPriceUsd) search.set('fobPrice', params.fobPriceUsd.toString());
  if (params.hsCode) search.set('hsCode', params.hsCode);
  if (params.buyerId) search.set('buyerId', params.buyerId);
  if (params.buyerName) search.set('buyerName', params.buyerName);
  if (params.buyerCountry) search.set('buyerCountry', params.buyerCountry);
  const qs = search.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
}
