import { useState, useEffect } from "react";
import axios from "axios";

export function usePagos({ page = 1, limit = 20, startDate, endDate, metodo }) {
  const [pagos, setPagos] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPagos = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/pagos", {
          params: { page, limit, startDate, endDate, metodo_pago: metodo },
        });
        setPagos(res.data.data);
        setTotal(res.data.total);
      } catch (err) {
        console.error("Error al cargar pagos:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPagos();
  }, [page, limit, startDate, endDate, metodo]);

  return { pagos, total, loading };
}
