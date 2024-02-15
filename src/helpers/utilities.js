export function getContributorName(item) {
    return item ? item.split("->")[0] : "";
}
export function getContributorOrcid(item) {
    return item ? item.split("->")[1] : "";
}