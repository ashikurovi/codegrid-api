import { CostingService } from './costing.service';

describe('CostingService', () => {
  let service: CostingService;
  let repo: any;

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      remove: jest.fn(),
      merge: jest.fn(),
    };

    service = new CostingService(repo);
  });

  it('stores only note, cost and reason fields', async () => {
    const dto = {
      note: 'Printing and cloth expense',
      cost: 1500,
      reason: 'Production cost',
    };

    const saved = { id: 1, ...dto };

    repo.create.mockReturnValue(saved);
    repo.save.mockResolvedValue(saved);

    const result = await service.create(dto);

    expect(result).toMatchObject({
      note: 'Printing and cloth expense',
      cost: 1500,
      reason: 'Production cost',
    });

    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        note: 'Printing and cloth expense',
        cost: 1500,
        reason: 'Production cost',
      }),
    );

    expect(repo.create.mock.calls[0][0]).not.toHaveProperty('orderId');
    expect(repo.create.mock.calls[0][0]).not.toHaveProperty('productId');
    expect(repo.create.mock.calls[0][0]).not.toHaveProperty('unitCost');
    expect(repo.create.mock.calls[0][0]).not.toHaveProperty('quantity');
    expect(repo.create.mock.calls[0][0]).not.toHaveProperty('totalCost');
  });
});
