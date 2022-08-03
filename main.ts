let y = 0
let x = 0
let moisture = 0
OLED.init(128, 64)
basic.forever(function () {
    pins.digitalWritePin(DigitalPin.P1, 1)
    basic.pause(10)
    moisture = Math.map(pins.analogReadPin(AnalogPin.P11), 0, 813, 0, 100)
    pins.digitalWritePin(DigitalPin.P1, 0)
    if (moisture < 50) {
        x = randint(0, 4)
        y = 0
        for (let index = 0; index < 9; index++) {
            led.plotBrightness(x, y, 255)
            led.plotBrightness(x, y - 1, 32)
            led.plotBrightness(x, y - 2, 8)
            led.plotBrightness(x, y - 3, 2)
            led.plotBrightness(x, y - 4, 0)
            y += 1
            basic.pause(50)
        }
    } else {
        basic.pause(1000)
    }
})
basic.forever(function () {
    led.plotBarGraph(
    smarthome.ReadSoilHumidity(AnalogPin.P11),
    100
    )
})
basic.forever(function () {
    OLED.writeNumNewLine(smarthome.ReadSoilHumidity(AnalogPin.P11))
    basic.pause(300)
    OLED.clear()
})
