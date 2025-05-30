export default function parseJwt(token) {
  try {
    // Розділяємо токен на частини
    const base64Url = token.split('.')[1]; // Беремо Payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Замінюємо символи для Base64
    const jsonPayload = atob(base64); // Декодуємо Base64
    return JSON.parse(jsonPayload); // Парсимо JSON
  } catch (e) {
    console.error('Помилка при парсингу JWT:', e);
    return null;
  }
}