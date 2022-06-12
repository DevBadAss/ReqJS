import Request from "./Request.js";

/**
 * Render html to a page dynamically .
 * @param node root element
 * @param root view url
 * @param {Object} param
 * @param {Object} param.datatype response type
 * @param {Object} param.id position
 * @param {Function} param.resolve Success Function
 * @param {Function} param.err Error Function
 * @param {Boolean} insert
 * @author Olawoore Emmanuel Collins
 */
const Render = (node, root, { datatype, id, resolve, err }, insert) => {
    const element = document.querySelector("#" + node) || document.querySelector("." + node);
    const positions = ["afterbegin", "afterend", "beforebegin", "beforeend"];
    const viewRequest = new Request({ url: root, method: "GET", type: "text/plain", res: datatype, data: null });
    viewRequest.pull((response) => {
        if (insert === true) {
            element.innerHTML = response;
        } else if (insert === false) {
            element.insertAdjacentHTML(positions[id], response);
        }
        resolve(response);
    }, (response) => {
        err(response);
    });
}

export default Render;