export const quizzes = {
  'decision-trees': [
    {
      q: 'What does a decision tree use to split data at each node?',
      options: [
        'Random selection',
        'Feature-based rules and splitting criteria',
        'Neural network weights',
        'Gradient descent',
      ],
      answer: 1,
      explanation:
        'Decision trees evaluate features using criteria like Information Gain or Gini Impurity to choose the best split at each internal node.',
    },
    {
      q: 'What does a Gini Impurity value of 0 indicate?',
      options: [
        'Maximum disorder in the node',
        'The node contains equal samples from every class',
        'The node is perfectly pure — all samples belong to one class',
        'The tree needs more depth',
      ],
      answer: 2,
      explanation:
        'A Gini value of 0 means every sample in the node belongs to the same class, i.e., it is perfectly pure.',
    },
    {
      q: 'Which technique helps prevent a decision tree from overfitting?',
      options: [
        'Adding more features',
        'Increasing tree depth',
        'Pruning',
        'Removing the validation set',
      ],
      answer: 2,
      explanation:
        'Pruning — either pre-pruning (early stopping) or post-pruning — reduces tree complexity and prevents the model from memorising training data.',
    },
    {
      q: 'In a decision tree, what does a leaf node represent?',
      options: [
        'A feature test',
        'A decision boundary',
        'A final prediction (class label or value)',
        'A weight update',
      ],
      answer: 2,
      explanation:
        'Leaf nodes are the terminal nodes of the tree. They hold the final output — a class label in classification or a predicted value in regression.',
    },
    {
      q: 'Which ensemble method combines many decision trees to reduce variance?',
      options: [
        'Logistic Regression',
        'Random Forest',
        'K-Means',
        'Principal Component Analysis',
      ],
      answer: 1,
      explanation:
        'A Random Forest trains multiple decision trees on random subsets of data and features, then aggregates their predictions to reduce variance and improve generalisation.',
    },
  ],
  'neural-networks': [
    {
      q: 'What is the primary purpose of an activation function in a neural network?',
      options: [
        'To initialise weights',
        'To introduce non-linearity',
        'To normalise input data',
        'To reduce learning rate',
      ],
      answer: 1,
      explanation:
        'Activation functions introduce non-linearity, enabling a neural network to learn complex, non-linear relationships in the data.',
    },
    {
      q: 'What does back-propagation compute?',
      options: [
        'The forward pass predictions',
        'The number of neurons needed',
        'The gradient of the loss with respect to each weight',
        'The optimal learning rate',
      ],
      answer: 2,
      explanation:
        'Back-propagation uses the chain rule to compute gradients of the loss function with respect to every weight in the network, enabling gradient-based optimisation.',
    },
    {
      q: 'Which activation function outputs values in the range (0, 1)?',
      options: ['ReLU', 'Tanh', 'Sigmoid', 'Leaky ReLU'],
      answer: 2,
      explanation:
        'The Sigmoid function squashes any real-valued input into the range (0, 1), making it useful for outputting probabilities.',
    },
    {
      q: 'What problem does the ReLU activation function help mitigate?',
      options: [
        'Exploding gradients',
        'Vanishing gradients',
        'Overfitting',
        'Data imbalance',
      ],
      answer: 1,
      explanation:
        'ReLU outputs the input directly for positive values and zero for negative values, which helps gradients flow during training and mitigates the vanishing gradient problem.',
    },
    {
      q: 'In a neural network, what is an epoch?',
      options: [
        'A single weight update',
        'One complete pass through the entire training dataset',
        'The final layer of the network',
        'A type of activation function',
      ],
      answer: 1,
      explanation:
        'An epoch is one full iteration over the entire training set. Multiple epochs are typically required for the network to converge to good weight values.',
    },
  ],
  classification: [
    {
      q: 'What type of machine learning task is classification?',
      options: [
        'Unsupervised learning',
        'Reinforcement learning',
        'Supervised learning',
        'Semi-supervised learning',
      ],
      answer: 2,
      explanation:
        'Classification is a supervised learning task — the model learns from labelled training data to predict discrete class labels for new inputs.',
    },
    {
      q: 'What does Precision measure?',
      options: [
        'The fraction of actual positives that are correctly identified',
        'The fraction of positive predictions that are actually positive',
        'The overall accuracy of the model',
        'The area under the ROC curve',
      ],
      answer: 1,
      explanation:
        'Precision = True Positives / (True Positives + False Positives). It measures how many of the predicted positives are truly positive.',
    },
    {
      q: 'What technique does SVM use to handle non-linearly separable data?',
      options: [
        'Dropout',
        'The kernel trick',
        'Batch normalisation',
        'Back-propagation',
      ],
      answer: 1,
      explanation:
        'The kernel trick maps features into a higher-dimensional space where a linear separator can be found, without explicitly computing the transformation.',
    },
    {
      q: 'What is the F1-Score?',
      options: [
        'The arithmetic mean of precision and recall',
        'The geometric mean of accuracy and precision',
        'The harmonic mean of precision and recall',
        'The sum of true positives and true negatives',
      ],
      answer: 2,
      explanation:
        'The F1-Score is the harmonic mean of precision and recall, giving a balanced single metric that accounts for both false positives and false negatives.',
    },
    {
      q: 'What does a confusion matrix show?',
      options: [
        'The learning rate over time',
        'True positives, true negatives, false positives, and false negatives',
        'The weight values of the model',
        'Feature importance rankings',
      ],
      answer: 1,
      explanation:
        'A confusion matrix is a table that visualises the performance of a classifier by showing counts of true positives, true negatives, false positives, and false negatives.',
    },
  ],
  clustering: [
    {
      q: 'What type of learning is clustering?',
      options: [
        'Supervised',
        'Unsupervised',
        'Reinforcement',
        'Transfer',
      ],
      answer: 1,
      explanation:
        'Clustering is an unsupervised learning task — it groups unlabelled data points based on similarity without predefined class labels.',
    },
    {
      q: 'What does K-Means minimise?',
      options: [
        'The number of features',
        'The between-cluster sum of squares',
        'The within-cluster sum of squares (inertia)',
        'The number of iterations',
      ],
      answer: 2,
      explanation:
        'K-Means minimises inertia — the total within-cluster sum of squared distances between each point and its assigned centroid.',
    },
    {
      q: 'What is the Elbow Method used for?',
      options: [
        'Selecting the best activation function',
        'Choosing the optimal number of clusters K',
        'Determining the learning rate',
        'Computing precision and recall',
      ],
      answer: 1,
      explanation:
        'The Elbow Method plots inertia against different values of K. The "elbow" — where the rate of decrease sharply changes — suggests the optimal number of clusters.',
    },
    {
      q: 'What advantage does DBSCAN have over K-Means?',
      options: [
        'It is always faster',
        'It requires specifying K',
        'It can find clusters of arbitrary shape and identify noise',
        'It uses gradient descent',
      ],
      answer: 2,
      explanation:
        'DBSCAN groups densely connected points without assuming spherical clusters and can label sparse points as noise, making it robust to outliers and non-convex shapes.',
    },
    {
      q: 'What does the Silhouette Score measure?',
      options: [
        'The number of clusters',
        'How similar a point is to its own cluster versus the nearest other cluster',
        'The total loss of the model',
        'The depth of a decision tree',
      ],
      answer: 1,
      explanation:
        'The Silhouette Score ranges from -1 to +1. A high value means the point is well-matched to its own cluster and poorly matched to neighbouring clusters.',
    },
  ],
  regression: [
    {
      q: 'What does OLS (Ordinary Least Squares) minimise?',
      options: [
        'The sum of absolute residuals',
        'The sum of squared residuals',
        'The number of features',
        'The learning rate',
      ],
      answer: 1,
      explanation:
        'OLS finds the coefficients that minimise the sum of squared differences between observed and predicted values (residuals).',
    },
    {
      q: 'What is the role of the bias term (β₀) in linear regression?',
      options: [
        'It scales all features equally',
        'It sets the y-intercept of the regression line',
        'It removes outliers',
        'It regularises the model',
      ],
      answer: 1,
      explanation:
        'The bias (intercept) β₀ shifts the regression line up or down so the model can fit data that does not pass through the origin.',
    },
    {
      q: 'What happens if the learning rate in gradient descent is too high?',
      options: [
        'The model converges too slowly',
        'The loss overshoots and may diverge',
        'The model underfits',
        'Nothing — gradient descent is robust to learning rate',
      ],
      answer: 1,
      explanation:
        'A learning rate that is too large causes weight updates to overshoot the minimum of the loss surface, potentially causing the loss to oscillate or diverge.',
    },
    {
      q: 'Which regularisation technique can drive some coefficients to exactly zero?',
      options: [
        'Ridge (L2)',
        'Lasso (L1)',
        'Dropout',
        'Batch Normalisation',
      ],
      answer: 1,
      explanation:
        'Lasso (L1) regularisation adds λΣ|β| to the cost function. The L1 penalty can shrink some coefficients to exactly zero, performing automatic feature selection.',
    },
    {
      q: 'What does an R² value of 1.0 indicate?',
      options: [
        'The model explains none of the variance',
        'The model perfectly explains all variance in the target',
        'The model is overfitting',
        'The model has no bias term',
      ],
      answer: 1,
      explanation:
        'R² = 1.0 means the model explains 100% of the variance in the dependent variable. In practice, this usually indicates overfitting unless the data is perfectly linear.',
    },
  ],
};
