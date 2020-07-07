function checkValidDate(date) {   
    return (date  instanceof Date && !isNaN(date.getTime())); 
}

export { checkValidDate }
