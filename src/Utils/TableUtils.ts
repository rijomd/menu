
type TypeStatus = { status: string, color: string };

export const getStatusColor = (value: any) => {
    const status: TypeStatus[] = [
        { status: 'Active', color: 'green' },
        { status: 'InActive', color: 'green' }
    ];
    return status.find(x => x.status === value)?.color || 'white';
}