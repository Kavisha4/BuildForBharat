

describe('Integration Tests', () => {
  test('Data Display: Fetch sparse matrix data from BigQuery and display correctly', async () => {
    // Simulate fetching sparse matrix data from BigQuery (mock API call)
    const sparseMatrixDataFromBigQuery = {
      '110001': ['MERCHANT_ID_1', 'MERCHANT_ID_2'],
      '110002': ['MERCHANT_ID_3', 'MERCHANT_ID_4'],
    };

    // Render the front-end component with the fetched sparse matrix data
    render(<SparseMatrix data={sparseMatrixDataFromBigQuery} />);
    
    // Assert that the component displays the correct data
    expect(screen.getByText('110001')).toBeInTheDocument();
    expect(screen.getByText('110002')).toBeInTheDocument();
    expect(screen.getByText('MERCHANT_ID_1')).toBeInTheDocument();
    expect(screen.getByText('MERCHANT_ID_2')).toBeInTheDocument();
    expect(screen.getByText('MERCHANT_ID_3')).toBeInTheDocument();
    expect(screen.getByText('MERCHANT_ID_4')).toBeInTheDocument();
    // Add more assertions for other pin codes and merchant IDs as needed
  });

  test('Data Filtering: Filter sparse matrix data from BigQuery and display correctly', async () => {
    // Simulate filtering sparse matrix data from BigQuery based on a pin code (mock API call)
    const filteredSparseMatrixDataFromBigQuery = {
      '110001': ['MERCHANT_ID_1', 'MERCHANT_ID_2'],
    };

    // Render the front-end component with the filtered sparse matrix data
    render(<SparseMatrix data={filteredSparseMatrixDataFromBigQuery} />);
    
    // Assert that the component displays the correct filtered data
    expect(screen.getByText('110001')).toBeInTheDocument();
    expect(screen.getByText('MERCHANT_ID_1')).toBeInTheDocument();
    expect(screen.getByText('MERCHANT_ID_2')).toBeInTheDocument();
    // Ensure other pin codes and merchant IDs are not displayed
    expect(screen.queryByText('110002')).not.toBeInTheDocument();
    expect(screen.queryByText('MERCHANT_ID_3')).not.toBeInTheDocument();
    expect(screen.queryByText('MERCHANT_ID_4')).not.toBeInTheDocument();
    // Add more assertions for other pin codes and merchant IDs as needed
  });
});
