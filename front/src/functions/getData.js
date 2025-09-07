export default function getData({
    setData,
    setIsLoading,
    setShowTable,
    body,
    setDataS,
}) {
    setIsLoading(true);
    setShowTable(true);

    const host = `http://${import.meta.env.VITE_HOSTIP}:8080/api/calculate`;
    fetch(host, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
        .then((resp) => {
            if (!resp.ok) {
                throw Error("SERVER DID NOT RESPONES WITH FILE");
            }
            return resp.json();
        })
        .then((response) => {
            // console.log(response);

            setDataS(response);

            let newResponse = {
                ...response,
                table: response.table.map((item) => {
                    return { ...item, date: item.date.slice(0, 10) };
                }),
            };
            setData(newResponse);
            setIsLoading(false);
        });
}
