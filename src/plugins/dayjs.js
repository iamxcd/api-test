import dayjs from 'dayjs'

dayjs.locale('zh-cn')

export const now = () => {
    return dayjs().format('YY-MM-DD HH:mm:ss')
}

export default dayjs

