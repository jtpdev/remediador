export interface ProvedorPadrao<M> {
    save(modelo: M);
    update(modelo: M);
    delete(id: number);
    find(id: number); 
    list();
}