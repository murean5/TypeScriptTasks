export async function fetchRates() {
    const token = import.meta.env.VITE_API_TOKEN;
    const apiUrl = `https://v1.apiplugin.io/v1/currency/${token}/rates?source=RUB&target=USD,EUR,GBP`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error("Ошибка запроса");

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Ошибка загрузки курсов валют:", error);
        return null;
    }
}
