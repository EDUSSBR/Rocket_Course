import { container } from 'tsyringe'
import { IDateProvider } from './DateProviders/IDateProvider'
import { IMailProvider } from './MailProvider/IMailProvider'
import { DayjsDateProvider } from './DateProviders/implementations/DayjsDateProvider'
import { EtherealMailProvider } from './MailProvider/implementations/EtherealMailProvider'

container.registerSingleton<IDateProvider>('DayjsDateProvider', DayjsDateProvider)
container.registerInstance<IMailProvider>('EtherealMailProvider', new EtherealMailProvider())
