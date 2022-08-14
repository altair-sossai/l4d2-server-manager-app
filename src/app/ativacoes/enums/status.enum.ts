export enum Status {
    NovaAtivacao,
    Liberado,
    ProximoExpirar,
    Expirado,
    Bloqueado,
    Vitalicio
}

export const StatusValues = [
    Status.NovaAtivacao,
    Status.Liberado,
    Status.ProximoExpirar,
    Status.Expirado,
    Status.Bloqueado,
    Status.Vitalicio
]

export const StatusDescription = {
    [Status.NovaAtivacao]: 'Nova ativação',
    [Status.Liberado]: 'Liberado',
    [Status.ProximoExpirar]: 'Próximo a expirar',
    [Status.Expirado]: 'Expirado',
    [Status.Bloqueado]: 'Bloqueado',
    [Status.Vitalicio]: 'Vitalício'
}
