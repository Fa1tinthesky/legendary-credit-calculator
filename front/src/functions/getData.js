export default function getData(setData, setIsLoading, body) {
    setIsLoading(true);
    fetch("http://10.192.9.134:8080/api/calculate", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    })
        .then((resp) => {
            return resp.json();
        })
        .then((response) => {
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
