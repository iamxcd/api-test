import dayjs from 'dayjs'

dayjs.locale('zh-cn')

export const now = () => {
    dayjs().format('YY-MM-DD HH:mm:ss')
}

export default dayjs

