function makeRule() {
  return function addHrContainer(state) {
    var arr = [];
    for (var i = 0; i < state.tokens.length; i++) {
      var curToken = state.tokens[i];
      if (curToken.type === "hr") {
        var hrContainerStart = new state.Token("html_inline", "", 0);
        hrContainerStart.content = `<div class="hr-container"><span></span><div class="hr" name="分割线" >分割线</div><span></span></div>`;
        arr.push(hrContainerStart);
      }  else {
        arr.push(curToken);
      }
    }
    state.tokens = arr;
  };
}

module.exports = (md) => {
  md.core.ruler.push("hr-container", makeRule(md));
};