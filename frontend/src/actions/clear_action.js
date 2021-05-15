//per me bo clear staten -> na vyn psh tek profile kur du me shtu nje koment per doktorin

const clear = () => (dispatch) => {
    dispatch({ type: 'CLEAR' })
}

export { clear }