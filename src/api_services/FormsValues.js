

export const returningValue = (v, type) => {
    const isValid = v !== undefined && v !== null && v !== "" && v !== NaN && v !== "null";
    if (isValid) {
        switch (type) {
            case "Alphabet":
                var va = v?.replace(/[^a-zA-Z ]/g, "")?.replace(/^\s+/, "")?.replace(/\s+/g, " ");
                va = va?.charAt(0).toUpperCase() + v.slice(1);
                return va;
            case "AlphaNumaric":
                var va = v?.replace(/[^a-zA-Z0-9 ]/g, "")?.replace(/^\s+/, "")?.replace(/\s+/g, " ");
                va = va?.charAt(0)?.toUpperCase() + v?.slice(1)
                return va
            case "Phone":
                let n = v?.replace("+966", "")?.replace(/[^0-9]/g, "")?.replace(/\s+/g, '');
                let l = n?.length;
                if (l > 0 && l <= 2) return n?.replace(/(\d{1})/, "+966 $1", "");
                else if (l > 2 && l <= 5) return n?.replace(/(\d{2})(\d{1})/, "+966 $1 $2", "");
                else if (l > 5 && l <= 9) return n?.replace(/(\d{2})(\d{3})(\d{1})/, "+966 $1 $2 $3", "");
                break;
            case "Date": return new Date(v) !== "Invalid Date" ? new Date(v) : "";
            case "Email": return v?.toLowerCase()?.replace(/\s+/g, '');
            case "Number": return typeof (v) == "string" ? v?.replace(/[^0-9 ]/g, "") : v
            case "Decimal": return parseFloat(v).toFixed(2);
            case "DateTime": return v === "Invalid date" ? "-" : v;
            // case "LocalTime": return moment.utc(v, "YYYY-MM-DDTHH:mm:ss").local().format('YYYY-MMM-DD H:mm:ss');
            case "NumberString": return v?.replace(/[^0-9]/g, "");
            case "WithoutSpaces": return v?.toString();
            case "ErrorColor": return "border border-danger";
            default: return v;
        }
    } else {
        switch (type) {
            case "Array": return [];
            case "Bool": return false
            default: return "";
        }
    }
};