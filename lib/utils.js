export const currencyFormater = (amount) => {
    const formatter = Intl.NumberFormat("pt-BR", {
        currency: "BRL",
        style: "currency",
    });
    return formatter.format(amount);
}