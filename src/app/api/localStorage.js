
export const getLocalStorage = (name) => {
    return localStorage.getItem(name)
}

export const setLocalStorage = (name, value) => {
    localStorage.setItem(name, value)
}

export const deleteLocalStorage = (name) => {
    localStorage.removeItem(name)
}