export function useTotales({ startDate, endDate }) {
  const [totales, setTotales] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotales = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/pagos/totales", {
          params: { startDate, endDate },
        });
        setTotales(res.data);
      } catch (err) {
        console.error("Error al cargar totales:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTotales();
  }, [startDate, endDate]);

  return { totales, loading };
}
