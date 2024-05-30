export namespace Match {
    export function AclRole(key: string) {


        switch (key) {
            case 'confirmedByTheUploader':
                return 'مسئول کارگاه'

            case 'confirmedByFinancialSupervisor':
                return 'ناظر مالی'

            case 'confirmedByTechnicalSupervisor':
                return 'ناظر فنی'

            case 'confirmedByProjectControlSupervisor':
                return 'ناظر کنترل پروژه'

            case 'confirmedBySupervisor':

                return 'سرپرست کل'

            default:
                return '[undefined]'
        }
    }
}