export const modules = [
  {
    id: 'decision-trees',
    title: 'Decision Trees',
    level: 'Beginner',
    description:
      'Learn how decision trees split data using feature-based rules to make predictions. Understand information gain, Gini impurity, and tree pruning.',
    sections: [
      {
        heading: 'What Is a Decision Tree?',
        body: 'A decision tree is a supervised learning algorithm used for both classification and regression tasks. It works by recursively splitting the dataset into subsets based on the value of input features. Each internal node represents a test on a feature (e.g., "Is age > 30?"), each branch represents the outcome of that test, and each leaf node holds a class label or a continuous value. The tree is built top-down by choosing the feature that best separates the data at each step, measured by criteria such as Information Gain or Gini Impurity. Decision trees are popular because they are easy to interpret, visualise, and require little data preprocessing.',
      },
      {
        heading: 'Splitting Criteria: Gini Impurity & Information Gain',
        body: 'To decide which feature to split on at each node the algorithm evaluates candidate splits using a purity metric. Gini Impurity measures how often a randomly chosen element would be misclassified if it were labelled according to the distribution of labels in that subset — a Gini value of 0 means the node is pure. Information Gain, rooted in information theory, calculates the reduction in entropy (disorder) after splitting. The algorithm picks the feature and threshold that maximise Information Gain (or minimise Gini). In practice both criteria produce similar trees, but Gini is slightly faster to compute. Understanding these metrics is key to diagnosing why a tree chose a particular split.',
      },
      {
        heading: 'Overfitting & Pruning',
        body: 'A fully grown decision tree can memorise the training data, leading to overfitting — high accuracy on training samples but poor generalisation to unseen data. Pruning techniques address this. Pre-pruning (early stopping) limits tree growth by setting a maximum depth, minimum samples per leaf, or minimum information gain threshold. Post-pruning grows the full tree first and then removes branches that provide little predictive power, often evaluated via a validation set or cost-complexity pruning (also called minimal cost-complexity pruning). Additional strategies include setting a maximum number of leaf nodes and using ensemble methods like Random Forests, which combine many shallow trees to reduce variance while retaining predictive strength.',
      },
    ],
  },
  {
    id: 'neural-networks',
    title: 'Neural Networks',
    level: 'Beginner',
    description:
      'Explore the building blocks of deep learning — neurons, layers, activation functions, and back-propagation.',
    sections: [
      {
        heading: 'Neurons and Layers',
        body: 'An artificial neural network is inspired by biological neurons. Each artificial neuron receives one or more inputs, multiplies each by a learnable weight, sums the weighted inputs plus a bias term, and passes the result through an activation function to produce an output. Neurons are organised into layers: the input layer receives raw features, one or more hidden layers perform intermediate computations, and the output layer produces the final prediction. A network with many hidden layers is called a deep neural network — the foundation of modern deep learning. The width (number of neurons per layer) and depth (number of layers) determine the model\'s capacity to learn complex patterns.',
      },
      {
        heading: 'Activation Functions',
        body: 'Activation functions introduce non-linearity, enabling neural networks to model complex, non-linear relationships in data. The Sigmoid function squashes outputs to the range (0, 1) and is useful for binary classification but suffers from vanishing gradients in deep networks. ReLU (Rectified Linear Unit) outputs zero for negative inputs and the input itself for positive values — it is computationally efficient and mitigates the vanishing gradient problem, making it the default choice for hidden layers. Variants like Leaky ReLU and ELU address the "dying ReLU" issue where neurons stop learning. Softmax generalises sigmoid to multiple classes and is typically used in the output layer for multi-class classification, producing a probability distribution over classes.',
      },
      {
        heading: 'Back-propagation and Training',
        body: 'Back-propagation is the algorithm that trains neural networks by computing the gradient of the loss function with respect to each weight. During the forward pass, inputs flow through the network to produce predictions. A loss function (e.g., cross-entropy for classification, mean squared error for regression) measures the prediction error. During the backward pass, the chain rule of calculus is applied layer by layer — from output to input — to compute how much each weight contributed to the error. An optimiser such as Stochastic Gradient Descent (SGD) or Adam then updates the weights in the direction that reduces the loss. Training proceeds over multiple epochs, and techniques like learning-rate scheduling, dropout, and batch normalisation help the network converge faster and generalise better.',
      },
    ],
  },
  {
    id: 'classification',
    title: 'Classification',
    level: 'Intermediate',
    description:
      'Understand supervised classification algorithms including logistic regression, SVMs, and evaluation metrics like precision, recall, and F1-score.',
    sections: [
      {
        heading: 'What Is Classification?',
        body: 'Classification is a supervised learning task where the model learns to assign input samples to one of a set of predefined categories (classes). Given a labelled training set, the algorithm builds a decision boundary in feature space that separates the classes. During inference, new samples are mapped to the class on the appropriate side of the boundary. Binary classification distinguishes between two classes (e.g., spam vs. not spam), while multi-class classification handles three or more (e.g., digit recognition 0–9). Common algorithms include Logistic Regression, k-Nearest Neighbours (k-NN), Support Vector Machines (SVM), Decision Trees, and Neural Networks. Choosing the right algorithm depends on factors like dataset size, feature dimensionality, linearity, and interpretability requirements.',
      },
      {
        heading: 'Logistic Regression & Support Vector Machines',
        body: 'Logistic Regression models the probability that an input belongs to a particular class using the logistic (sigmoid) function. Despite its name, it is a classification algorithm. It finds a linear decision boundary that maximises the likelihood of the observed labels and outputs calibrated probabilities, which is valuable when you need confidence scores. Support Vector Machines (SVM) take a different geometric approach: they find the hyperplane that maximises the margin — the distance between the nearest points of each class (support vectors) and the boundary. This margin-maximisation principle gives SVMs strong generalisation. For non-linearly separable data, the kernel trick (e.g., RBF, polynomial kernels) implicitly maps features into a higher-dimensional space where a linear separator exists.',
      },
      {
        heading: 'Evaluation Metrics',
        body: 'Accuracy alone can be misleading, especially with imbalanced datasets. Precision measures the fraction of positive predictions that are actually positive — important when false positives are costly (e.g., spam filtering). Recall (sensitivity) measures the fraction of actual positives that are correctly identified — critical when false negatives are costly (e.g., disease detection). The F1-Score is the harmonic mean of precision and recall, providing a single balanced metric. The confusion matrix gives a full picture: true positives, true negatives, false positives, and false negatives. ROC curves plot the true positive rate against the false positive rate at various thresholds, and the Area Under the Curve (AUC) summarises overall discriminative ability across all thresholds.',
      },
    ],
  },
  {
    id: 'clustering',
    title: 'Clustering & K-Means',
    level: 'Intermediate',
    description:
      'Discover unsupervised clustering techniques — K-Means, hierarchical clustering, and how to choose the optimal number of clusters.',
    sections: [
      {
        heading: 'Unsupervised Learning & Clustering',
        body: 'Unlike supervised learning, unsupervised learning works with unlabelled data — the algorithm must discover hidden structure on its own. Clustering is the most common unsupervised task: grouping data points so that items within a cluster are more similar to each other than to items in other clusters. Similarity is typically measured using distance metrics such as Euclidean distance, Manhattan distance, or cosine similarity. Use cases include customer segmentation, anomaly detection, document grouping, and image compression. Clustering results can also serve as features for downstream supervised models, a technique known as semi-supervised learning or feature engineering via clustering.',
      },
      {
        heading: 'The K-Means Algorithm',
        body: 'K-Means is the most widely used clustering algorithm due to its simplicity and scalability. It works as follows: (1) Choose K, the number of clusters. (2) Randomly initialise K centroids. (3) Assign each data point to the nearest centroid. (4) Recompute each centroid as the mean of all points assigned to it. (5) Repeat steps 3–4 until assignments stop changing or a maximum number of iterations is reached. The algorithm minimises the within-cluster sum of squares (inertia). K-Means++ is an improved initialisation strategy that spreads initial centroids apart, reducing the chance of poor convergence. Limitations include the need to specify K in advance, sensitivity to outliers, and the assumption that clusters are spherical and equally sized.',
      },
      {
        heading: 'Choosing K & Alternative Methods',
        body: 'Selecting the right number of clusters is crucial. The Elbow Method plots inertia (within-cluster sum of squares) against K; the "elbow" — where the rate of decrease sharply changes — suggests the optimal K. The Silhouette Score measures how similar each point is to its own cluster versus the nearest neighbouring cluster, with values closer to +1 indicating well-separated clusters. Beyond K-Means, hierarchical clustering (agglomerative or divisive) builds a dendrogram that can be cut at any level to produce clusters without specifying K upfront. DBSCAN (Density-Based Spatial Clustering of Applications with Noise) identifies clusters of arbitrary shape by grouping densely connected points and labelling sparse points as noise — especially useful when clusters are non-spherical or data contains outliers.',
      },
    ],
  },
  {
    id: 'regression',
    title: 'Linear Regression',
    level: 'Advanced',
    description:
      'Master the mathematics behind linear regression — least squares, gradient descent, regularisation, and model evaluation.',
    sections: [
      {
        heading: 'Simple & Multiple Linear Regression',
        body: 'Linear regression models the relationship between a dependent variable (target) and one or more independent variables (features) by fitting a straight line (or hyperplane in higher dimensions). In simple linear regression the model is y = β₀ + β₁x + ε, where β₀ is the intercept, β₁ is the slope, and ε is the error term. The Ordinary Least Squares (OLS) method finds the coefficients that minimise the sum of squared residuals — the differences between observed and predicted values. In multiple linear regression the model extends to y = β₀ + β₁x₁ + β₂x₂ + … + βₙxₙ + ε. Assumptions include linearity, independence of errors, homoscedasticity (constant variance of errors), and normally distributed residuals. Violations of these assumptions may require transformations or alternative models.',
      },
      {
        heading: 'Gradient Descent Optimisation',
        body: 'When datasets are very large or the closed-form OLS solution is computationally expensive, gradient descent provides an iterative alternative. The algorithm starts with random coefficient values and repeatedly updates them in the direction that reduces the cost function (typically Mean Squared Error). The update rule is β := β − α · ∂J/∂β, where α is the learning rate and J is the cost function. A learning rate that is too high causes overshooting and divergence; too low leads to slow convergence. Variants include Batch Gradient Descent (uses the entire dataset per step), Stochastic Gradient Descent (uses one sample per step for faster but noisier updates), and Mini-batch Gradient Descent (uses small batches for a balance of speed and stability). Monitoring the loss curve helps diagnose convergence issues.',
      },
      {
        heading: 'Regularisation & Model Evaluation',
        body: 'Regularisation adds a penalty term to the cost function to prevent overfitting, especially when there are many features relative to the number of samples. L2 regularisation (Ridge Regression) adds λΣβ² to the cost, shrinking coefficients toward zero but never exactly to zero. L1 regularisation (Lasso Regression) adds λΣ|β|, which can drive some coefficients to exactly zero, effectively performing feature selection. Elastic Net combines both penalties. The regularisation strength λ is a hyper-parameter chosen via cross-validation. Model evaluation metrics for regression include R² (coefficient of determination, the proportion of variance explained), Mean Absolute Error (MAE), Mean Squared Error (MSE), and Root Mean Squared Error (RMSE). Residual plots help verify assumptions and detect patterns the model has missed.',
      },
    ],
  },
];
