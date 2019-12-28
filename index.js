const startButton = document.getElementById("start-button")

const recognition = new webkitSpeechRecognition()
recognition.continuous = true
recognition.interimResults = true

recognition.onaudiostart = () => {
  console.log("onaudiostart")
}

recognition.onaudioend = () => {
  console.log("onaudioend")
}

recognition.onend = () => {
  console.log("onend")
  startButton.style.visibility = "visible"
  recognition.start()
}

recognition.onerror = ev => {
  console.log(ev.error)
}

recognition.onnomatch = () => {
  console.log("no match")
}

const options = {
  multiresult: false,
  textStyle: {
    "font-family": "HiraKakuPro-W6",
    "font-size": "38px",
    "font-weight": "bolder",
    "dominant-baseline": "text-before-edge"
  },
  backgroundTextStyle: {
    "stroke": "red",
    "stroke-width": "7px",
    "stroke-linejoin": "round"
  },
  foregroundTextStyle: {
    "fill": "white"
  }
}

const getTextFromResults = (results) => {
  if (results.length === 0) {
    return ""
  }
  if (options.multiresult) {
    return Array.from(results).map(r => r[0].transcript).join("\n")
  }

  const result = results[results.length - 1]
  if (result.length === 0) {
    return ""
  }
  return result[0].transcript
}

const createSVGElement = (tag) => 
  document.createElementNS("http://www.w3.org/2000/svg", tag)

const setAttributes = (elem, attrs) => {
  Object.keys(attrs).forEach(key => {
    elem.setAttribute(key, attrs[key])
  })
}

const renderText = (text) => {
  const container = document.getElementById("result")
  
  if (container.textContent === text) {
    return
  }

  container.innerHTML = ""
  
  const svg = createSVGElement("svg")
  container.appendChild(svg)

  const strokeWidth = options.backgroundTextStyle["stroke-width"]
  const textPos = {
    x: strokeWidth,
    y: strokeWidth,
  }
  
  const backgroundText = createSVGElement("text")
  backgroundText.textContent = text
  setAttributes(backgroundText, {
    ...textPos,
    ...options.textStyle,
    ...options.backgroundTextStyle
  })
  svg.appendChild(backgroundText)
  
  const foregroundText = createSVGElement("text")
  foregroundText.textContent = text
  setAttributes(foregroundText, {
    ...textPos,
    ...options.textStyle,
    ...options.foregroundTextStyle
  })
  svg.appendChild(foregroundText)

  const textSize = backgroundText.getBoundingClientRect()
  const padding = parseFloat(strokeWidth) * 2
  const w = textSize.width + padding
  const h = textSize.height + padding
  svg.setAttribute("viewBox", `0 0 ${w} ${h}`)
}

const talkBack = (result) => {
  const synthesis = window.speechSynthesis
  const utter = new SpeechSynthesisUtterance(result)
  const voices = synthesis.getVoices()
  utter.voice = voices[0]
  utter.volume = 1
  utter.rate = 0.9
  utter.pitch = 1.0
  synthesis.speak(utter)
}

recognition.onresult = ev => {
  const text = getTextFromResults(ev.results)
  renderText(text)
  if (ev.results[ev.results.length - 1].isFinal) {
    talkBack(text)
  }
}

recognition.onsoundstart = () => {
  console.log("音が検出できました。")
}

recognition.onsoundend = () => {
  console.log("音の検出は終わりました。")
}

recognition.onspeechstart = () => {
  console.log("音声が検出できました。")
}

recognition.onspeechend = () => {
  console.log("音声の検出が終わりました。")
}

recognition.onstart = () => {
  console.log("音声認識サービスに接続されました。")
  startButton.style.visibility = "hidden"
}

startButton.onclick = () => {
  recognition.start()
}

//renderText("字幕サンプル")