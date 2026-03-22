interface SuccessNotification {
    type: 'success'
    message: string
    duration: number  // через сколько мс скрыть уведомление
}

interface ErrorNotification {
    type: 'error'
    message: string
    retry: boolean    // можно ли повторить запрос
    errorCode: number
}

interface WarningNotification {
    type: 'warning'
    message: string
}

type AppNotification = SuccessNotification | ErrorNotification | WarningNotification

const NOTIFICATION_CONFIG = {
    success: { icon: 'success', color: '#4caf50' },
    error:   { icon: 'error',   color: '#f44336' },
    warning: { icon: 'warning', color: '#ff9800' },
} satisfies { [key in AppNotification['type']]: { icon: string; color: string } }

function renderNotification(n: AppNotification): string {
    switch (n.type) {
        case 'success':
            return `success: ${n.message} (${n.duration}ms)`
        case 'error':
            return `error: [${n.errorCode}] ${n.message}`
        case 'warning':
            return `warning: ${n.message}`
        default:
            const _exhaustive: never = n
            return _exhaustive
    }
}

function isErrorNotification(n: AppNotification): n is ErrorNotification {
    return n.type === 'error'
}

type NotificationPreview =
    | Pick<SuccessNotification, 'type' | 'message'>
    | Pick<ErrorNotification, 'type' | 'message'>
    | Pick<WarningNotification, 'type' | 'message'>

type NotificationWithoutMeta = Omit<ErrorNotification, 'errorCode'>

interface NotificationMeta {
    id: string
    createdAt: Date
    readAt?: Date  // если не задано — уведомление не прочитано
}

type TrackedNotification = AppNotification & NotificationMeta

function getUnread(notifications: TrackedNotification[]): TrackedNotification[] {
    return notifications.filter((n) => n.readAt === undefined)
}

const notifications: TrackedNotification[] = [
    { id: '1', type: 'success', message: 'Saved', duration: 3000, createdAt: new Date() },
    { id: '2', type: 'error', message: 'Server error', retry: true, errorCode: 503, createdAt: new Date(), readAt: new Date() },
    { id: '3', type: 'warning', message: 'Low disk space', createdAt: new Date() },
]

console.log(renderNotification(notifications.find((n) => n.id === '1')!))
console.log(getUnread(notifications))

const err: AppNotification = { type: 'error', message: 'Something went wrong', retry: false, errorCode: 404 }
if (isErrorNotification(err)) {
    console.log(err.errorCode, err.retry)
}