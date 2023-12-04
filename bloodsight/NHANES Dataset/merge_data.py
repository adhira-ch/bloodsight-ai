import pandas as pd
import numpy as np

# # Load the DataFrame
# file_path = 'merged_filtered_data.csv'  # Replace with the actual path to your file
# df = pd.read_csv(file_path)

# # Remove duplicate columns
# df = df.loc[:,~df.columns.duplicated()]

# # Move 'SEQN' column to the first position
# seqn_col = df.pop('SEQN')
# df.insert(0, 'SEQN', seqn_col)

# # Save the DataFrame with no duplicate columns and 'SEQN' as the first column
# output_file_path = 'final_cleaned_data.csv'  # Replace with the desired path for the output file
# df.to_csv(output_file_path, index=False)

# Load the DataFrame (replace 'your_dataframe.csv' with the actual file path)
# df = pd.read_csv('final_cleaned_data.csv')

# # Drop rows where the 'DID040' column has a missing value
# df = df.dropna(subset=['DID040'])

# # Save the cleaned DataFrame (optional)
# df.to_csv('diabetes_df.csv', index=False)

# Load the original DataFrame