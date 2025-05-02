export const useTimer = (precision = 2) => {
    const time = ref(0)
    const timePrecision = ref(precision)
    const formatedTime = computed(() => {
        const seconds = time.value / 1000;
        const factor = 1 / timePrecision.value;
        return Math.round(seconds * factor) / factor;
        // return timePrecision.value % precision === 0 ? timePrecision.value % precision === 0 : timePrecision.value
    })
    const isRunning = ref(false)

    let handle

    let startTime
    let freezedTime = 0

    function setPrecision(precision) {
        timePrecision.value = precision
    }


    function stopTimer() {
        isRunning.value = false
    }

    function startTimer() {
        console.log(freezedTime)
        startTime = performance.now()
        isRunning.value = true
        nextTick()
        // requestAnimationFrame(nextTick)d

    }


    function nextTick() {
        time.value = (performance.now() - startTime) + freezedTime
        if (isRunning.value) {
            handle = requestAnimationFrame(nextTick)
        } else {
            cancelAnimationFrame(handle)
            freezedTime = time.value

        }

    }

    return {
        time,
        timePrecision,
        formatedTime,
        setPrecision,
        startTimer,
        stopTimer,
    }
}