const convertToLPA = (monthlySalary: string | number): number => {
    const monthly = typeof monthlySalary === 'string' ? parseFloat(monthlySalary) : monthlySalary
    const annual = monthly * 12
    const lpa = annual / 100000
    return parseFloat(lpa.toFixed(2))
}

export {
    convertToLPA
}