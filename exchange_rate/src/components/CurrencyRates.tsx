import { useState, useEffect } from "react";
import { fetchRates } from "../utils/fetchRates";

const CurrencyRates = () => {
    const [rates, setRates] = useState<{ [key: string]: number } | null>(null);
    const [timestamp, setTimestamp] = useState<number | null>(null);

    useEffect(() => {
        const getRates = async () => {
            const data = await fetchRates();
            if (data) {
                setRates(data.rates);
                setTimestamp(data.timestamp);
            }
        };

        getRates();
    }, []);

    const formatCurrency = (value: number, currency: string) => {
        return new Intl.NumberFormat("ru-RU", { style: "currency", currency, minimumFractionDigits: 4 }).format(value);
    };

    return (
        <div>
            <h2>Курсы валют (RUB → x)</h2>
            {rates ? (
                <ul>
                    {Object.entries(rates).map(([currency, rate]) => (
                        <li key={currency}>
                            <strong>{currency}:</strong> {formatCurrency(rate, currency)}
                        </li>
                        ))}
                </ul>
            ) : (
                <p>Загрузка данных...</p>
            )}
            {timestamp && (
                <p><strong>Обновлено:</strong> {new Intl.DateTimeFormat("ru-RU", {
                    dateStyle: "full",
                    timeStyle: "full"
                }).format(timestamp)}</p>
                )}
        </div>
    );
};

export default CurrencyRates;
