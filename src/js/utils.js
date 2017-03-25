export default class Utils {

  static htmlSetAttibutes(element, attributes) {
    for (let attribute in attributes) {
      element.setAttribute(attribute, attributes[attribute]);
    }

    return element;
  }
}