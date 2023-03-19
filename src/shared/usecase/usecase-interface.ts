export default interface UseCaseInterface<T, G> {
  execute (input?: T): Promise<G>
}
