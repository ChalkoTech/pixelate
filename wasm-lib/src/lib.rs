use wasm_bindgen::prelude::*;
use web_sys::console;

// Import the `window.alert` function from the Web.
#[wasm_bindgen]
extern "C" {
    fn alert(s: &str);
}

#[wasm_bindgen]
pub fn process(format: &str, data: &[u8]) -> js_sys::Uint8Array {
    console::log_2(&"result is: ".into(), &format.into());
    return js_sys::Uint8Array::from(data);
}
