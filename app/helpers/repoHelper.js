export const proccessRepo = (data, brand = 'adobe') => {
    let filterData = data.sort((a, b) => new Date(b.pushedAt) - new Date(a.pushedAt))
        .map(item => item.name);
    // if it's testing data then ading the most ative repo for demo
    if (brand === 'adobe') {
        filterData = ['aem-core-forms-components', ...filterData]
    }
    return filterData
}
